// Function name: stores/add

const addStores = async (...args) => {
  const stores = args.map((arg) => ({
    name: arg.name,
    app_ids: arg.appIds ? arg.appIds : [],
    create_at: arg.createAt ? arg.createAt : new Date(),
  }));

  const mongodb = context.services.get("mongodb-atlas");
  const _stores = mongodb.db("default").collection("stores");
  const result = await _stores.insertMany(stores);
  return result.insertedIds;
};

exports = addStores;
