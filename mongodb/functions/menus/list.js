// Function name: menus/list

const listMenus = async (arg) => {
  const limit = arg.limit ? arg.limit : 20;

  const pipeline = [
    // sort by date
    {
      $sort: {
        create_at: -1,
      },
    },

    // filter only limit number of reviews
    { $limit: limit },

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
  ];

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
