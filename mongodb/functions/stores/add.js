// Function name: stores/add
// Version 2.0.0 - Initiate stores/add for 2.0 data

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const toObjectIds = (array) => {
  return array.map((element) => BSON.ObjectId(element));
};

const storesAdd = async (arg) => {
  const store = {
    name: arg.name,
    app_ids: toObjectIds(getArgs(arg, "appIds", [])),
    menu_ids: toObjectIds(getArgs(arg, "menuIds", [])),
    review_ids: toObjectIds(getArgs(arg, "reviewIds", [])),
    create_at: getArgs(arg, "createAt", new Date()),
  };

  const mongodb = context.services.get("mongodb-atlas");
  const _stores = mongodb.db("default").collection("stores");
  const result = await _stores.insertOne(store);
  return { id: result.insertedId };
};

exports = storesAdd;
