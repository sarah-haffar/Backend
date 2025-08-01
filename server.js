const express = require("express");
const app = express();
const db = require("./models");
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const PERMISSIONS = require('./config/permissions');

const authRouter = require("./routers/auth"); // PUBLIC
const isAuthenticated = require("./middlewares/isAuthenticated"); // ⛔️ PROTECTOR
const hasPermission = require("./middlewares/hasPermission");
const searchRoute = require('./routers/search');
const carRouter = require("./routers/car");

const userRouter = require("./routers/userRoutes");
const carModelRoutes = require("./routers/carModelRoutes");
const cartRoutes = require("./routers/cartRoutes");
const engineRoutes = require("./routers/engineRoutes");
const orderItemRoutes = require("./routers/orderItemRoutes");
const orderRoutes = require("./routers/orderRoutes");
const partCategoryRoutes = require("./routers/partCategoryRoutes");
const roleRoutes = require("./routers/roleRoutes");
const shopRoutes = require("./routers/shopRoutes");
const carBrand = require("./routers/carBrandRoutes");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api', searchRoute);

// ADD THIS to serve raw swagger JSON for tools like Postman
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

/** ✅ PUBLIC ROUTES **/
app.use("/api/auth", authRouter); // <-- only this one is public

/** ⛔️ PROTECTED ROUTES (everything below this needs login) **/
app.use(isAuthenticated); // <-- middleware that checks JWT


app.use("/api/cars", hasPermission("MANAGE_USERS"), carRouter);
app.use("/api/carBrand", hasPermission("MANAGE_CAR_MODELS"), carModelRoutes);

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
      await Role.bulkCreate([
        {
          id: 1,
          name: 'superAdmin',
          permissions: [PERMISSIONS.ALL],
          created_at: new Date()
        },
        {
          id: 2,
          name: 'admin',
          permissions: [
            PERMISSIONS.MANAGE_USERS,
            PERMISSIONS.MANAGE_ORDERS,
            PERMISSIONS.MANAGE_PARTS,
          ],
          created_at: new Date()
        },
        {
          id: 3,
          name: 'shopAdmin',
          permissions: [
            PERMISSIONS.VIEW_SHOP,
            PERMISSIONS.MANAGE_PRODUCTS,
            PERMISSIONS.VIEW_ORDERS,
          ],
          created_at: new Date()
        }
      ]);
      console.log("✅ Default roles created.");
    } else {
      await Role.update(
        { permissions: [PERMISSIONS.ALL] },
        { where: { name: 'superAdmin' } }
      );
      await Role.update(
        { permissions: [PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_ORDERS, PERMISSIONS.MANAGE_PARTS] },
        { where: { name: 'admin' } }
      );
      await Role.update(
        { permissions: [PERMISSIONS.VIEW_SHOP, PERMISSIONS.MANAGE_PRODUCTS, PERMISSIONS.VIEW_ORDERS] },
        { where: { name: 'shopAdmin' } }
      );
      console.log("✅ Default roles updated.");
    }



    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  });

