// Function name: menus/add

const addMenus = async (...args) => {
  const menus = args.map((arg) => ({
    name: arg.name,
    price: arg.price ? arg.price : -1,
    create_at: arg.createAt ? arg.createAt : new Date(),
  }));

  const mongodb = context.services.get("mongodb-atlas");
  const _menus = mongodb.db("default").collection("menus");
  const result = await _menus.insertMany(menus);
  return result.insertedIds;
};

exports = addMenus;
