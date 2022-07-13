// Function name: menus/add
// Version 2.0.0 - Initiate menus/add for 2.0 data

const getArgs = (arg, key, defaultValue) => {
  if (arg && arg[key]) {
    return arg[key];
  }
  return defaultValue;
};

const menusAdd = async (arg) => {
  const storeId = arg.storeId;
  const menu = {
    name: arg.name,
    prices: getArgs(arg, "prices", []),
    review_ids: getArgs(arg, "reviewIds", []),
    create_at: getArgs(arg, "createAt", new Date()),
  };

  const mongodb = context.services.get("mongodb-atlas");
  const _menus = mongodb.db("default").collection("menus");
  const result = await _menus.insertOne(menu);
  const menuId = result.insertedId;

  const { success } = await context.functions.execute("stores/update", {
    id: storeId,
    menuIds: [menuId],
  });

  return { success, id: menuId };
};

exports = menusAdd;
