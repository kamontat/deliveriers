import { goto } from "./utils";

export const gotoCreateStore = () => {
  return goto({
    path: "/store",
  });
};

export const gotoStore = (id: string) => {
  return goto({
    path: "/store/{id}",
    templateData: { id },
  });
};

interface ReviewQuery {
  storeId?: string;
  menuIds?: string[];
}
export const gotoReview = (query: ReviewQuery) => {
  const params = new URLSearchParams();
  if (query.storeId) params.set("storeId", query.storeId);
  if (query.menuIds && query.menuIds.length > 0) query.menuIds.forEach((menuId) => params.append("menuIds", menuId));

  goto({
    path: "/review",
    query: params,
  });
};
