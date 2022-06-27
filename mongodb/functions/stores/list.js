// Function name: stores/list

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const listStores = async (arg) => {
  const limit = getArgs(arg, "limit", 20);
  const name = getArgs(arg, "name", undefined);
  const appName = getArgs(arg, "appName", undefined);

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

  if (appName) {
    const apps = await context.functions.execute("apps/list", {
      name: appName,
    });
    const appIds = apps.rows.map((app) => app.id);
    // console.log(JSON.stringify(appsIds, undefined, "  "));
    pipeline.push({
      $match: {
        app_ids: {
          $in: appIds,
        },
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

    {
      $unwind: {
        path: "$apps",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $group: {
        _id: "$name",
        id: {
          $first: "$_id",
        },
        createAt: {
          $first: "$create_at",
        },
        apps: {
          $push: {
            id: "$apps._id",
            name: "$apps.name",
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
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
  const _stores = await mongodb.db("default").collection("stores");

  const count = await _stores.count();
  const rows = await _stores.aggregate(pipeline).toArray();

  return {
    total: count,
    // Current query have problem when application doesn't contains any apps.
    // It form apps array with empty object. `apps: [{}]`
    rows: rows.map((row) => {
      row.apps = row.apps.length === 1 && row.apps[0].id === undefined ? [] : row.apps;
      return row;
    }),
  };
};

exports = listStores;
