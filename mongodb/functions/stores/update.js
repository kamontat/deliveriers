// Function name: stores/update
// Version 2.0.0 - Initiate stores/update for 2.0 data
// Version 2.0.1 - Fix changes has error if function $set is missing

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const toObjectIds = (array) => {
  return array.map((element) => (typeof element === "string" ? BSON.ObjectId(element) : element));
};

const storesUpdate = async (arg) => {
  const id = BSON.ObjectId(arg.id);

  let hasChange = false;
  const changes = {};

  const name = getArgs(arg, "name", undefined);
  if (name) {
    hasChange = true;

    changes["$set"] = {
      name,
      modify_at: new Date(),
    };
  }

  const menuIds = toObjectIds(getArgs(arg, "menuIds", []));
  if (menuIds.length > 0) {
    hasChange = true;
    if (!changes["$push"]) changes["$push"] = {};
    changes["$push"].menu_ids = { $each: menuIds };
  }

  const reviewIds = toObjectIds(getArgs(arg, "reviewIds", []));
  if (reviewIds.length > 0) {
    hasChange = true;
    if (!changes["$push"]) changes["$push"] = {};
    changes["$push"].review_ids = { $each: reviewIds };
  }

  if (!hasChange) throw new Error("No changes to update");

  const mongodb = context.services.get("mongodb-atlas");
  const _stores = mongodb.db("default").collection("stores");
  const result = await _stores.updateOne({ _id: id }, changes);
  return { success: result.modifiedCount > 0 };
};

exports = storesUpdate;
