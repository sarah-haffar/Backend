const express = require("express");
const app = express();
const db = require("./models");
require('dotenv').config();

const authRouter = require("./routers/auth"); // PUBLIC
const isAuthenticated = require("./middlewares/isAuthenticated"); // ⛔️ PROTECTOR

const userRouter = require("./routers/userRoutes");
const carModelRoutes = require("./routers/carModelRoutes");
const cartRoutes = require("./routers/cartRoutes");
const engineRoutes = require("./routers/engineRoutes");
const orderItemRoutes = require("./routers/orderItemRoutes");
const orderRoutes = require("./routers/orderRoutes");
const partCategoryRoutes = require("./routers/partCategoryRoutes");
const roleRoutes = require("./routers/roleRoutes");
const shopRoutes = require("./routers/shopRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** ✅ PUBLIC ROUTES **/
app.use("/api/auth", authRouter); // <-- only this one is public

/** ⛔️ PROTECTED ROUTES (everything below this needs login) **/
app.use(isAuthenticated); // <-- middleware that checks JWT

app.use("/api/users", userRouter);
app.use("/api/carModel", carModelRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/engine", engineRoutes);
app.use("/api/orderItem", orderItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/partCategory", partCategoryRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/roles", roleRoutes);



db.sequelize.sync().then(async () => {
  const Role = db.Role;

  // Check if roles exist
  const existingRoles = await Role.findAll();
  if (existingRoles.length === 0) {
    await Role.bulkCreate([
      { id: 1, name: 'superAdmin', created_at: new Date() },
      { id: 2, name: 'admin', created_at: new Date() },
      { id: 3, name: 'shopAdmin', created_at: new Date() }
    ]);
    console.log("✅ Default roles created.");
  } else {
    console.log("ℹ️ Roles already exist, skipping creation.");
  }

  app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
  });
});

