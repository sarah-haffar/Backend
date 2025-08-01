// permissions.js
const PERMISSIONS = {
  MANAGE_USERS: "MANAGE_USERS",
  MANAGE_ORDERS: "MANAGE_ORDERS",
  MANAGE_PARTS: "MANAGE_PARTS",
  VIEW_SHOP: "VIEW_SHOP",
  MANAGE_PRODUCTS: "MANAGE_PRODUCTS",
  VIEW_ORDERS: "VIEW_ORDERS",
  ACCESS_CART: "ACCESS_CART",
  MANAGE_ENGINES: "MANAGE_ENGINES",
  MANAGE_ROLES: "MANAGE_ROLES",
  MANAGE_ORDER_ITEMS: "MANAGE_ORDER_ITEMS",
  MANAGE_PART_CATEGORIES: "MANAGE_PART_CATEGORIES",
  MANAGE_SHOPS: "MANAGE_SHOPS",
  MANAGE_CAR_MODELS: "MANAGE_CAR_MODELS",
  // add any other permissions you use
  ALL: "*",  // optional shorthand for all permissions
};

module.exports = PERMISSIONS;
