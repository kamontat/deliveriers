import { writable } from "svelte/store";

export interface RawCacheModel {
  response: unknown;
  expireAt: number;
}

export interface RawCacheErrorModel {
  error: string;
}

export type RawCache = RawCacheModel | RawCacheErrorModel;

const rawCache: Record<string, RawCache> = {};
export const cache = writable(rawCache);

export const isRawCacheModel = (value: RawCache): value is RawCacheModel => {
  return value && typeof value === "object" && "response" in value && "expireAt" in value;
};

export const isRawCacheErrorModel = (value: RawCache): value is RawCacheErrorModel => {
  return value && typeof value === "object" && "error" in value;
};

export const setCache = async <T>(key: string, expire: number, callback: () => Promise<T>): Promise<T> => {
  try {
    const _now = Date.now();
    const _expire = expire;
    const _response = await callback();

    const result: RawCacheModel = {
      response: _response,
      expireAt: _now + _expire,
    };

    rawCache[key] = result;
    cache.update((c) => {
      c[key] = result;
      return c;
    });
    localStorage.setItem(key, JSON.stringify(result));
    return _response;
  } catch (err: any) {
    const result = {
      error: err.message,
    };

    rawCache[key] = result;
    cache.update((c) => {
      c[key] = result;
      return c;
    });
    localStorage.setItem(key, JSON.stringify(result));
    throw err;
  }
};

export type GetCacheResponse<T> =
  | {
      status: "complete";
      response: T;
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "expired";
    }
  | {
      status: "notFound";
    };

export const getCache = <T>(key: string): GetCacheResponse<T> => {
  let cache = rawCache[key];

  if (!cache) {
    const storage = localStorage.getItem(key);
    if (storage) cache = JSON.parse(storage);
    else
      return {
        status: "notFound",
      };
  }

  if (isRawCacheErrorModel(cache))
    return {
      status: "error",
      error: cache.error,
    };

  if (+new Date() > cache.expireAt)
    return {
      status: "expired",
    };

  return {
    status: "complete",
    response: cache.response as T,
  };
};
