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
    const cache = await getCache(key);
    if (cache.status === "success") {
      console.log("Cache hit (expire", cache.expireIn, "ms)");
      return cache.response as T;
    }
  }

  console.log("Cache missed!", key);
  return setCache(key, _expireIn, callback);
};
