// Function name: apps/list

const listApps = async (arg) => {
  const pipeline = [
    // sort by date
    {
      $sort: {
        name: 1,
      },
    },

    {
      $project: {
        _id: 0,
        id: "$_id",
        name: "$name",
      },
    },
  ];

  const mongodb = context.services.get("mongodb-atlas");
  const _apps = await mongodb.db("default").collection("apps");

  const count = await _apps.count();
  const rows = await _apps.aggregate(pipeline).toArray();

  return {
    total: count,
    rows,
  };
};

exports = listApps;
