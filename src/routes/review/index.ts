import type { RequestHandler } from "@sveltejs/kit";

const get: RequestHandler = async ({ url }) => {
  const id = url.searchParams.get("storeId");
  if (!id)
    return {
      status: 400,
      headers: {
        errorMessage: "storeId is required",
      },
    };

  return {
    status: 200,
  };
};

export { get };
