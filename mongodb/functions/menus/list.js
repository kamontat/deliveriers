// Function name: menus/list

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const listMenus = async (arg) => {
  const limit = getArgs(arg, "limit", 20);
  const name = getArgs(arg, "name", undefined);

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

  pipeline.push(
    // select only fields for reponse
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: "$name",
        price: "$price",
        createAt: "$create_at",
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
  const _menus = await mongodb.db("default").collection("menus");

  const count = await _menus.count();
  const rows = await _menus.aggregate(pipeline).toArray();

  return {
    total: count,
    rows,
  };
};

exports = listMenus;
