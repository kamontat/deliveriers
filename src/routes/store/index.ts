import type { RequestHandler } from "@sveltejs/kit";

import { app } from "$lib/authentication";
import { request } from "$lib/mongodb/client";
import { FNAME_STORES_ADD } from "$lib/mongodb/constants";

const post: RequestHandler = async ({ request: req }) => {
  const form = await req.formData();
  const storeName = form.get("storeName")?.toString();
  const appIds = form.getAll("appIds").map((id) => id.toString());

  if (!storeName) {
    return {
      status: 400,
      body: {
        errors: {
          storeName: "Store name is required",
        },
      },
    };
  }

  console.log(app.currentUser);

  const response = await request(
    app.currentUser,
    FNAME_STORES_ADD,
    {
      name: storeName,
      appIds,
    },
    {
      cache: false,
    }
  );

  console.log(response);

  // redirect to the newly created item
  return {
    status: 200,
    // status: 303,
    // headers: {
    //   location: `/items/${item.id}`,
    // },
  };
};

export { post };
