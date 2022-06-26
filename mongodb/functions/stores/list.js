// Function name: stores/list

const listStores = async (arg) => {
  const limit = arg.limit ? arg.limit : 20;
  const name = arg.name;

  const pipeline = [];

  // filter store by name
  if (name) {
    pipeline.push({
      $match: {
        $text: {
          $search: name,
          $language: "none",
          $caseSensitive: false,
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
      $unwind: "$apps",
    },

    {
      $group: {
        _id: "$_id",
        id: {
          $first: "$_id",
        },
        name: {
          $first: "$name",
        },
        createAt: {
          $first: "$create_at",
        },
        apps: {
          $push: {
            id: "$apps._id",
            name: "apps.name",
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
    rows,
  };
};

exports = listStores;
