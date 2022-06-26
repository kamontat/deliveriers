// Function name: reviews/add

const addReviews = async (...args) => {
  const reviews = args.map((arg) => ({
    star: arg.star,
    description: arg.description,
    menu_id: arg.menuId,
    store_id: arg.storeId,
    create_at: arg.createAt ? arg.createAt : new Date(),
  }));

  const mongodb = context.services.get("mongodb-atlas");
  const _reviews = mongodb.db("default").collection("reviews");
  const result = await _reviews.insertMany(reviews);
  return result.insertedIds;
};

exports = addReviews;
