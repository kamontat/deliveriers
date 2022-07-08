export interface RawCacheModel {
  response: unknown;
  expireAt: number;
}

export interface RawCacheErrorModel {
  error: string;
}

export interface CacheOption {
  cache?: boolean;
  expireIn?: number; // in milliseconds
}

export interface CacheKey<T> {
  userId: string;
  fnName: string;
  args?: T;
}

export type CacheResponse<T> =
  | {
      status: "success";
      response: T;
      expireIn: number;
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

export type RawCache = RawCacheModel | RawCacheErrorModel;

export const isRawCacheModel = (value: RawCache): value is RawCacheModel => {
  return value && typeof value === "object" && "response" in value && "expireAt" in value;
};

export const isRawCacheErrorModel = (value: RawCache): value is RawCacheErrorModel => {
  return value && typeof value === "object" && "error" in value;
};
