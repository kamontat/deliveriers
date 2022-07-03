import { Buffer } from "buffer";

import type { RealmUser } from "$lib/authentication";
import { getCache, setCache } from "./cache";
import type { Mapper } from "./models";

export const getFunctionUniqueKey = (user: RealmUser, fnName: string, args?: unknown) => {
  const parameters = [user.id, fnName];
  if (args) parameters.push(JSON.stringify(args));

  const result = parameters.join("-");
  return Buffer.from(result).toString(`base64`);
};

export const request = <FN extends keyof Mapper>(
  user: RealmUser | undefined,
  fnName: FN,
  args?: Mapper[FN]["argument"]
): Promise<Mapper[FN]["return"]> | undefined => {
  // On initiate load, user will not populate yet
  if (!user) return;

  const key = getFunctionUniqueKey(user, fnName, args);
  const cache = getCache<Mapper[FN]["return"]>(key);
  switch (cache.status) {
    case "complete":
      return new Promise((resolve) => resolve(cache.response));
    default:
      const timer = 5 * 60 * 1000;
      return setCache(key, timer, () => user.callFunction<Mapper[FN]["return"]>(fnName, args));
  }
};
