import type { CacheKey, CacheOption } from "./models";

import { Buffer } from "buffer";

import { getCache, setCache } from "./repositories";

export const createKey = <T>(key: CacheKey<T>): string => {
  const parameters = [key.userId, key.fnName];
  if (key.args) parameters.push(JSON.stringify(key.args));

  const result = parameters.join("-");
  return Buffer.from(result).toString(`base64`);
};

export const parseKey = <T>(key: string): CacheKey<T> => {
  const parameter = Buffer.from(key, "base64").toString("utf8");
  const [userId, fnName, args] = parameter.split("-");
  return {
    userId,
    fnName,
    args: args ? JSON.parse(args) : undefined,
  };
};

export const get = <A, T>(key: CacheKey<A>) => {
  const cache = getCache(key);
  if (cache.status === "success") {
    console.log("Cache hit (expire", cache.expireIn, "ms)");
    return cache.response as T;
  }

  return undefined;
};

export const set = <A, T>(key: CacheKey<A>, expireIn: number, callback: (key: CacheKey<A>) => Promise<T>) => {
  console.log("Cache missed!", key);
  return setCache(key, expireIn, callback);
};

export const getOrUpdate = async <A, T>(
  key: CacheKey<A>,
  callback: (key: CacheKey<A>) => Promise<T>,
  options?: CacheOption
) => {
  const _options: Required<CacheOption> = {
    cache: options?.cache ?? true,
    expireIn: options?.expireIn ?? 5 * 60 * 1000, // default is 5 minutes
  };
  // If cache is false, don't use cache. If cache is true, get expireIn value to fallback to default value
  const _expireIn = _options.cache ? _options.expireIn : 0;

  if (_options.cache) {
    const cache = get<A, T>(key);
    if (cache) return cache;
  }

  return set(key, _expireIn, callback);
};
