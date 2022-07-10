import type { RealmUser } from "$lib/authentication";
import type { Mapper } from "../models/mapper";
import type { RequestOption } from "./models";

import { get, getOrUpdate, type CacheKey } from "../cache";
import { removeCache } from "../cache/repositories";

export const request = <FN extends keyof Mapper>(
  user: RealmUser | undefined | null,
  fnName: FN,
  args?: Mapper[FN]["args"],
  options?: RequestOption
): Promise<Mapper[FN]["response"]> | undefined => {
  // On initiate load, user will not populate yet
  if (!user) return;

  const key: CacheKey<Mapper[FN]["args"]> = {
    userId: user.id,
    fnName: fnName,
    args,
  };

  return getOrUpdate(key, (k) => user.callFunction<Mapper[FN]["response"]>(k.fnName, k.args), {
    cache: options?.cache,
    expireIn: options?.expire,
  });
};

export const requestCache = <FN extends keyof Mapper>(
  user: RealmUser | undefined | null,
  fnName: FN,
  args?: Mapper[FN]["args"]
) => {
  // On initiate load, user will not populate yet
  if (!user) return;

  return get<Mapper[FN]["args"], Mapper[FN]["response"]>({
    userId: user.id,
    fnName,
    args,
  });
};

export const refreshCache = <FN extends keyof Mapper>(
  user: RealmUser | undefined | null,
  fnName: FN,
  args?: Mapper[FN]["args"],
  options?: RequestOption
) => {
  // On initiate load, user will not populate yet
  if (!user) return;

  const key: CacheKey<Mapper[FN]["args"]> = {
    userId: user.id,
    fnName,
    args,
  };

  removeCache(key);
  return request(user, fnName, args, options);
};
