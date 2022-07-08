// Function name: stores/get
// Version 2.0.0 - Initiate apps/list for 2.0 data

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

      // join with reviews collection
      {
        $lookup: {
          from: "reviews",
          localField: "review_ids",
          foreignField: "_id",
          as: "reviews",
        },
      },

      // join with review menus collection
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "menus",
          localField: "reviews.menu_ids",
          foreignField: "_id",
          as: "reviews.menus",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          apps: { $first: "$apps" },
          menus: { $first: "$menus" },
          reviews: {
            $push: {
              id: "$reviews._id",
              name: "$reviews.name",
              rating: "$reviews.rating",
              title: "$reviews.title",
              comment: "$reviews.comment",
              menus: "$reviews.menus",
              create_at: "$reviews.create_at",
            },
          },
          create_at: { $first: "$create_at" },
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
