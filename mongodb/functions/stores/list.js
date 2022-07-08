// Function name: stores/list
// Version 2.0.0 - Initiate apps/list for 2.0 data

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const storesList = async (arg) => {
  const limit = getArgs(arg, "limit", 20);
  const name = getArgs(arg, "name", undefined);
  const appIds = getArgs(arg, "appIds", []);
  const ratings = getArgs(arg, "ratings", []); // [1, 2, 3, 4, 5]
  const sortName = getArgs(arg, "sortName", "create_at"); // "create_at" OR "rating"
  const isAscendingSort = getArgs(arg, "ascending", false);

  const sorting = {
    [sortName]: isAscendingSort ? 1 : -1,
  };
  const pipeline = [];

  if (name) {
    pipeline.push({
      $search: {
        autocomplete: {
          path: "name",
          query: name,
        },
      },
    });
  }

  if (appIds.length > 0) {
    pipeline.push({
      $match: {
        app_ids: {
          $in: appIds.map((id) => BSON.ObjectId(id)),
        },
      },
    });
  }

  pipeline.push(
    // join with reviews collection
    {
      $lookup: {
        from: "reviews",
        localField: "review_ids",
        foreignField: "_id",
        as: "reviews",
      },
    },

    // add store rating from all reviews
    {
      $addFields: {
        rating: {
          $avg: {
            $map: {
              input: "$reviews",
              in: "$$this.rating",
            },
          },
        },
      },
    }
  );

  if (ratings.length > 0) {
    const or = ratings.map((rating) => ({
      rating: {
        $gte: rating,
        $lt: rating + 1,
      },
    }));

    pipeline.push({
      $match: {
        $or: or,
      },
    });
  }

  pipeline.push(
    // join with apps collection
    {
      $lookup: {
        from: "apps",
        localField: "app_ids",
        foreignField: "_id",
        as: "apps",
      },
    },

    // remove app_ids from response collection
    {
      $unset: ["app_ids", "review_ids", "menu_ids", "reviews"],
    },

    // sort by date
    {
      $sort: sorting,
    }
  );

  const mongodb = context.services.get("mongodb-atlas");
  const _stores = await mongodb.db("default").collection("stores");

  const rows = await _stores.aggregate(pipeline).toArray();
  const total = rows.length;

  return {
    total,
    rows: rows.slice(0, limit),
  };
};

exports = storesList;
