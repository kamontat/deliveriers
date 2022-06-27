// Function name: apps/list

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const listApps = async (arg) => {
  const limit = getArgs(arg, "limit", 20);
  const name = getArgs(arg, "name", undefined);

  const pipeline = [];
  if (name) {
    pipeline.push({
      $match: {
        name: {
          $regex: name,
          $options: "i",
        },
      },
    });
  }

  pipeline.push(
    // format response
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: "$name",
      },
    },
    // sort by date
    {
      $sort: {
        name: 1,
      },
    }
  );

  const mongodb = context.services.get("mongodb-atlas");
  const _apps = await mongodb.db("default").collection("apps", { collation: { strength: 1 } });

  const count = await _apps.count();
  const rows = await _apps.aggregate(pipeline).toArray();

  return {
    total: count,
    rows,
  };
};

exports = listApps;
