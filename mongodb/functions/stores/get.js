// Function name: stores/get
// Version 2.0.0 - Initiate stores/get for 2.0 data
// Version 2.0.1 - Fix menus has only reviews fields if menus is empty
// Version 2.1.0 - Change menu price to history of prices

const storesGet = async (arg) => {
  try {
    const id = BSON.ObjectId(arg.id);
    const pipeline = [
      {
        $match: {
          _id: {
            $eq: id,
          },
        },
      },

      // join with apps collection
      {
        $lookup: {
          from: "apps",
          localField: "app_ids",
          foreignField: "_id",
          as: "apps",
        },
      },

      // join with menus collection
      {
        $lookup: {
          from: "menus",
          localField: "menu_ids",
          foreignField: "_id",
          as: "menus",
        },
      },

      // join with store reviews collection
      {
        $lookup: {
          from: "reviews",
          localField: "review_ids",
          foreignField: "_id",
          as: "reviews",
        },
      },

      // join with menus reviews collection
      {
        $unwind: {
          path: "$menus",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "menus.review_ids",
          foreignField: "_id",
          as: "menus.reviews",
        },
      },

      // add menu rating from all menu reviews
      {
        $addFields: {
          menuRating: {
            $avg: "$menus.reviews.rating",
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          apps: { $first: "$apps" },
          menus: {
            $push: {
              $cond: [
                { $ne: [{ $ifNull: ["$menus._id", ""] }, ""] },
                {
                  _id: "$menus._id",
                  name: "$menus.name",
                  prices: "$menus.prices",
                  reviews: "$menus.reviews",
                  create_at: "$menus.create_at",
                },
                "$$REMOVE",
              ],
            },
          },
          reviews: { $first: "$reviews" },
          create_at: { $first: "$create_at" },
          menuRating: { $avg: "$menuRating" },
        },
      },

      // add store rating from all store reviews
      {
        $addFields: {
          storeRating: {
            $avg: "$reviews.rating",
          },
        },
      },
    ];

    const mongodb = context.services.get("mongodb-atlas");
    const _stores = mongodb.db("default").collection("stores");

    const response = await _stores.aggregate(pipeline).toArray();
    if (response.length > 1) {
      throw new Error("More than one store found");
    } else if (response.length === 0) {
      throw new Error("Store not found");
    }

    return {
      status: "SUCCESS",
      response: response[0],
    };
  } catch (error) {
    return {
      status: "ERROR",
      response: error.message,
    };
  }
};

exports = storesGet;
