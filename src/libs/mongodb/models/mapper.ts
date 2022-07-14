import type {
  FNAME_APPS_LIST,
  FNAME_STORES_GET,
  FNAME_STORES_LIST,
  FNAME_STORES_ADD,
  FNAME_MENUS_ADD,
  FNAME_REVIEWS_ADD,
} from "../constants";

import type { AppListArgs, AppListResponse } from "./appList";
import type { StoreListArgs, StoreListResponse } from "./storeList";
import type { StoreGetArgs, StoreGetResponse } from "./storeGet";
import type { StoreAddArgs, StoreAddResponse } from "./storeAdd";
import type { MenuAddArgs, MenuAddResponse } from "./menuAdd";
import type { ReviewAddArgs, ReviewAddResponse } from "./reviewAdd";

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
  [FNAME_STORES_ADD]: {
    args: StoreAddArgs;
    response: StoreAddResponse;
  };
  [FNAME_MENUS_ADD]: {
    args: MenuAddArgs;
    response: MenuAddResponse;
  };
  [FNAME_REVIEWS_ADD]: {
    args: ReviewAddArgs;
    response: ReviewAddResponse;
  };
};
