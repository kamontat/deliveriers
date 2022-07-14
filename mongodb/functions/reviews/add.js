// Function name: reviews/add
// Version 2.0.0 - Initiate reviews/add for 2.0 data

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const toObjectIds = (array) => {
  return array.map((element) => (typeof element === "string" ? BSON.ObjectId(element) : element));
};

const reviewsAdd = async (arg) => {
  const storeId = arg.storeId;
  const menuIds = getArgs(arg, "menuIds", []);
  const review = {
    rating: arg.rating,
    title: arg.title,
    comment: arg.comment,
    store_id: BSON.ObjectId(storeId),
    menu_ids: toObjectIds(menuIds),
    create_at: getArgs(arg, "createAt", new Date()),
  };

  const mongodb = context.services.get("mongodb-atlas");
  const _reviews = mongodb.db("default").collection("reviews");
  const result = await _reviews.insertOne(review);
  const reviewId = result.insertedId;

  const successes = [];

  try {
    const { success } = await context.functions.execute("stores/update", {
      id: storeId,
      reviewIds: [reviewId],
    });
    successes.push(success);
  } catch (error) {
    throw new Error("cannot update store");
  }

  for (const menuId of menuIds) {
    try {
      const { success } = await context.functions.execute("menus/update", {
        id: menuId,
        reviewIds: [reviewId],
      });
      successes.push(success);
    } catch (error) {
      console.log(error);
      throw new Error("cannot update menu id: " + menuId);
    }
  }

  return { success: successes.every((s) => s === true), id: reviewId };
};

exports = reviewsAdd;
