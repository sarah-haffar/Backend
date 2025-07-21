const express = require("express");
const app = express();
const db = require("./models");
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


const authRouter = require("./routers/auth"); // PUBLIC
const isAuthenticated = require("./middlewares/isAuthenticated"); // ⛔️ PROTECTOR
const hasPermission = require("./middlewares/hasPermission");

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ADD THIS to serve raw swagger JSON for tools like Postman
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

/** ✅ PUBLIC ROUTES **/
app.use("/api/auth", authRouter); // <-- only this one is public

/** ⛔️ PROTECTED ROUTES (everything below this needs login) **/
app.use(isAuthenticated); // <-- middleware that checks JWT



app.use("/api/users", hasPermission("MANAGE_USERS"), userRouter);
app.use("/api/carModel", hasPermission("MANAGE_CAR_MODELS"), carModelRoutes);
app.use("/api/cart", hasPermission("ACCESS_CART"), cartRoutes);
app.use("/api/engine", hasPermission("MANAGE_ENGINES"), engineRoutes);
app.use("/api/orderItem", hasPermission("MANAGE_ORDER_ITEMS"), orderItemRoutes);
app.use("/api/orders", hasPermission("MANAGE_ORDERS"), orderRoutes);
app.use("/api/partCategory", hasPermission("MANAGE_PART_CATEGORIES"), partCategoryRoutes);
app.use("/api/shop", hasPermission("MANAGE_SHOPS"), shopRoutes);
app.use("/api/roles", hasPermission("MANAGE_ROLES"), roleRoutes);



db.sequelize.sync({ alter: true, logging: console.log })
  .then(async () => {
    const Role = db.Role;

    // Check if roles exist
    const existingRoles = await Role.findAll();
    if (existingRoles.length === 0) {
      // Fresh setup
      await Role.bulkCreate([
        {
          id: 1,
          name: 'superAdmin',
          permissions: ['*'],
          created_at: new Date()
        },
        {
          id: 2,
          name: 'admin',
          permissions: ['MANAGE_USERS', 'MANAGE_ORDERS', 'MANAGE_PARTS'],
          created_at: new Date()
        },
        {
          id: 3,
          name: 'shopAdmin',
          permissions: ['VIEW_SHOP', 'MANAGE_PRODUCTS', 'VIEW_ORDERS'],
          created_at: new Date()
        }
      ]);
      console.log("✅ Default roles created.");
    } else {
      // Update roles in case permissions were missing or incorrect
      await Role.update(
        { permissions: ['*'] },
        { where: { name: 'superAdmin' } }
      );
      await Role.update(
        { permissions: ['MANAGE_USERS', 'MANAGE_ORDERS', 'MANAGE_PARTS'] },
        { where: { name: 'admin' } }
      );
      await Role.update(
        { permissions: ['VIEW_SHOP', 'MANAGE_PRODUCTS', 'VIEW_ORDERS'] },
        { where: { name: 'shopAdmin' } }
      );
      console.log("✅ Default roles updated.");
    }




    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  });

