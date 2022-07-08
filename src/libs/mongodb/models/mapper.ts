import type { AppListArgs, AppListResponse } from "./appList";
import type { StoreListArgs, StoreListResponse } from "./storeList";

import type { FNAME_APPS_LIST, FNAME_STORES_GET, FNAME_STORES_LIST } from "../constants";
import type { StoreGetArgs, StoreGetResponse } from "./storeGet";

export type Mapper = {
  [FNAME_APPS_LIST]: {
    args: AppListArgs;
    response: AppListResponse;
  };
  [FNAME_STORES_LIST]: {
    args: StoreListArgs;
    response: StoreListResponse;
  };
  [FNAME_STORES_GET]: {
    args: StoreGetArgs;
    response: StoreGetResponse;
  };
};
