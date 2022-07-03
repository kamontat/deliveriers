import type { AppListArgs, Apps } from "$lib/apps";
import type { MenuAddArgs, MenuListArgs, Menus } from "$lib/menus";
import type { ReviewAddArgs, ReviewListArgs, Reviews } from "$lib/reviews";
import type { StoreAddArgs, StoreListArgs, Stores } from "$lib/stores";
import type {
  APPS_LIST_FNAME,
  MENUS_ADD_FNAME,
  MENUS_LIST_FNAME,
  REVIEWS_ADD_FNAME,
  REVIEWS_LIST_FNAME,
  STORES_ADD_FNAME,
  STORES_LIST_FNAME,
} from "./constants";

export interface Mapper {
  [APPS_LIST_FNAME]: {
    argument: AppListArgs;
    return: Apps;
  };
  [MENUS_ADD_FNAME]: {
    argument: MenuAddArgs;
    return: string[];
  };
  [MENUS_LIST_FNAME]: {
    argument: MenuListArgs;
    return: Menus;
  };
  [STORES_ADD_FNAME]: {
    argument: StoreAddArgs;
    return: string[];
  };
  [STORES_LIST_FNAME]: {
    argument: StoreListArgs;
    return: Stores;
  };
  [REVIEWS_ADD_FNAME]: {
    argument: ReviewAddArgs;
    return: string[];
  };
  [REVIEWS_LIST_FNAME]: {
    argument: ReviewListArgs;
    return: Reviews;
  };
}
