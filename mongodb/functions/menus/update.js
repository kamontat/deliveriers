// Function name: menus/update
// Version 2.0.0 - Initiate menus/update for 2.0 data

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const toObjectIds = (array) => {
  return array.map((element) => (typeof element === "string" ? BSON.ObjectId(element) : element));
};

const menusUpdate = async (arg) => {
  const id = BSON.ObjectId(arg.id);

  let hasChange = false;
  const changes = {};

  const name = getArgs(arg, "name", undefined);
  if (name) {
    hasChange = true;
    if (!changes["$set"]) changes["$set"] = {};

    changes["$set"].name = name;
    changes["$set"].modify_at = new Date();
  }

  const price = getArgs(arg, "price", undefined);
  if (price) {
    hasChange = true;
    if (!changes["$push"]) changes["$push"] = {};
    changes["$push"].price = price;
  }

  const reviewIds = toObjectIds(getArgs(arg, "reviewIds", []));
  if (reviewIds.length > 0) {
    hasChange = true;
    if (!changes["$push"]) changes["$push"] = {};
    changes["$push"].review_ids = { $each: reviewIds };
  }

  if (!hasChange) throw new Error("No changes to update");

  const mongodb = context.services.get("mongodb-atlas");
  const _menus = mongodb.db("default").collection("menus");
  const result = await _menus.updateOne({ _id: id }, changes);
  return { success: result.modifiedCount > 0 };
};

exports = menusUpdate;
