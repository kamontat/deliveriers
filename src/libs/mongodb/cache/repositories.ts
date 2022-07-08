import {
  isRawCacheErrorModel,
  type CacheKey,
  type CacheResponse,
  type RawCache,
  type RawCacheErrorModel,
  type RawCacheModel,
} from "./models";

import { cache } from "./store";
import { createKey } from "./utils";

export const setCache = async <A, T>(
  key: CacheKey<A>,
  expire: number,
  callback: (key: CacheKey<A>) => Promise<T>
): Promise<T> => {
  const _now = Date.now();
  const _expire = expire;
  const _key = createKey(key);

  try {
    const _response = await callback(key);

    const result: RawCacheModel = {
      response: _response,
      expireAt: _now + _expire,
    };

    if (_expire > 0) {
      cache.update((c) => {
        c[_key] = result;
        return c;
      });
      localStorage.setItem(_key, JSON.stringify(result));
    }
    return _response;
  } catch (err: any) {
    const result: RawCacheErrorModel = {
      error: err.message,
    };

    if (_expire > 0) {
      cache.update((c) => {
        c[_key] = result;
        return c;
      });
      localStorage.setItem(_key, JSON.stringify(result));
    }
    throw err;
  }
};

export const getCache = async <A, T>(key: CacheKey<A>): Promise<CacheResponse<T>> => {
  const _key = createKey(key);
  const storage = localStorage.getItem(_key);
  if (!storage)
    return {
      status: "notFound",
    };

  const cache: RawCache = JSON.parse(storage);
  if (isRawCacheErrorModel(cache))
    return {
      status: "error",
      error: cache.error,
    };

  const _now = +new Date();
  if (_now > cache.expireAt)
    return {
      status: "expired",
    };

  return {
    status: "success",
    response: cache.response as T,
    expireIn: cache.expireAt - _now,
  };
};

export const removeCache = <A, T>(key: CacheKey<A>): void => {
  const _key = createKey(key);
  cache.update((c) => {
    if (c[_key]) {
      delete c[_key];
    }
    return c;
  });

  if (localStorage.getItem(_key) !== null) {
    localStorage.removeItem(_key);
  }
};
