// Function name: apps/list
// Version 2.0.0 - Initiate apps/list for 2.0 data
// Version 2.0.1 - Fix `total` should be total rows with current filtered

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const appsList = async (arg) => {
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
    // sort by name
    {
      $sort: {
        name: 1,
      },
    }
  );

  const mongodb = context.services.get("mongodb-atlas");
  const _apps = await mongodb.db("default").collection("apps", { collation: { strength: 1 } });

  const rows = await _apps.aggregate(pipeline).toArray();
  const total = rows.length;

  return {
    total,
    rows: rows.slice(0, limit),
  };
};

exports = appsList;
