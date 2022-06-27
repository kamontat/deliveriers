// Function name: reviews/list

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const listReviews = async (arg) => {
  const limit = getArgs(arg, "limit", 20);

  const star = getArgs(arg, "star", undefined);
  const description = getArgs(arg, "description", undefined);
  const appName = getArgs(arg, "appName", undefined);
  const storeName = getArgs(arg, "storeName", undefined);
  const menuName = getArgs(arg, "menuName", undefined);

  const pipeline = [];
  if (description) {
    pipeline.push({
      $search: {
        autocomplete: {
          path: "description",
          query: description,
        },
      },
    });
  }
  if (storeName || appName) {
    const stores = await context.functions.execute("stores/list", {
      name: storeName,
      appName: appName,
    });
    const storeIds = stores.rows.map((store) => store.id);
    pipeline.push({
      $match: {
        store_id: {
          $in: storeIds,
        },
      },
    });
  }
  if (menuName) {
    const menus = await context.functions.execute("menus/list", {
      name: menuName,
    });
    const menuIds = stores.rows.map((menu) => menu.id);
    pipeline.push({
      $match: {
        menu_id: {
          $in: menuIds,
        },
      },
    });
  }
  if (star) {
    const stars = Array.isArray(star) ? star : [star];
    pipeline.push({
      $match: {
        star: {
          $in: stars,
        },
      },
    });
  }

  pipeline.push(
    // join with menus collection
    {
      $lookup: {
        from: "menus",
        localField: "menu_id",
        foreignField: "_id",
        as: "menu",
      },
    },

    // join with stores collection
    {
      $lookup: {
        from: "stores",
        localField: "store_id",
        foreignField: "_id",
        as: "store",
      },
    },

    // join with store app collection
    {
      $lookup: {
        from: "apps",
        localField: "store.app_ids",
        foreignField: "_id",
        as: "apps",
      },
    },

    // unwind array to single element
    { $unwind: "$menu" },
    // unwind array to single element
    { $unwind: "$store" },
    // unwind apps for aggregate later
    { $unwind: "$apps" },

    // aggregate apps together and update response
    {
      $group: {
        _id: "$_id",
        id: {
          $first: "$_id",
        },
        star: {
          $first: "$star",
        },
        description: {
          $first: "$description",
        },
        createAt: {
          $first: "$create_at",
        },
        menu: {
          $first: "$menu",
        },
        store: {
          $first: "$store",
        },
        apps: {
          $push: {
            id: "$apps._id",
            name: "$apps.name",
          },
        },
      },
    },

    // constructure final response object
    {
      $project: {
        _id: 0,
        id: "$_id",
        star: "$star",
        description: "$description",
        createAt: "$createAt",
        menu: {
          id: "$menu._id",
          name: "$menu.name",
          price: "$menu.price",
          createAt: "$menu.createAt",
        },
        store: {
          id: "$store._id",
          name: "$store.name",
          createAt: "$store.createAt",
          apps: "$apps",
        },
      },
    },

    // sort by date
    {
      $sort: {
        create_at: -1,
      },
    },

    // filter only limit number of reviews
    { $limit: limit }
  );

  const mongodb = context.services.get("mongodb-atlas");
  const _reviews = await mongodb.db("default").collection("reviews");

  const count = await _reviews.count();
  const rows = await _reviews.aggregate(pipeline).toArray();

  return {
    total: count,
    rows,
  };
};

exports = listReviews;
