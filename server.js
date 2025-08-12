const express = require("express");
const app = express();
const db = require("./models");
require('dotenv').config();

const requireRole = require("./middlewares/requireRole");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const PERMISSIONS = require('./config/permissions');

const authRouter = require("./routers/auth"); // PUBLIC
const isAuthenticated = require("./middlewares/isAuthenticated");
const hasPermission = require("./middlewares/hasPermission");

const searchRoute = require('./routers/search');

const carRouter = require("./routers/car");
const car_brands = require("./routers/carBrandRoutes");

const carBrandRoutes = require("./routers/carBrandRoutes");
const userRouter = require("./routers/userRoutes");
const carModelRoutes = require("./routers/carModelRoutes");
const cartRoutes = require("./routers/cartRoutes");
const engineRoutes = require("./routers/engineRoutes");
const orderItemRoutes = require("./routers/orderItemRoutes");
const orderRoutes = require("./routers/orderRoutes");
const partRoutes = require('./routers/partRoutes');
const partCategoryRoutes = require('./routers/partCategoryRoutes');
const roleRoutes = require("./routers/roleRoutes");
const shopRoutes = require("./routers/shopRoutes");
const vinRoutes = require('./routers/vinRoutes');

const roleAdminRoutes = require("./routers/admin/roleRoutes");
const permissionAdminRoutes = require("./routers/admin/permissionRoutes");
const userAdminRoutes = require('./routers/admin/userAdminRoutes');
const adminUsersRouter = require("./routers/adminUsers");
const adminStatsRoutes = require('./routers/admin/adminStatsRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public routes
app.use("/api/auth", authRouter);
app.use("/api", searchRoute);


// Serve raw swagger json for external tools
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Protected routes (require authentication)
app.use(isAuthenticated);

// Admin routes protected by roles
app.use("/api/admin/roles", requireRole("superAdmin"), roleAdminRoutes);
app.use("/api/admin/permissions", requireRole("superAdmin"), permissionAdminRoutes);
app.use("/api/admin/users", requireRole("superAdmin"), userAdminRoutes);
app.use("/api/admin", requireRole("superAdmin"), adminUsersRouter);
app.use("/api/admin", requireRole("shopAdmin"), adminStatsRoutes);

// Here: we DO NOT apply hasPermission globally to carBrand, carModel, engine routes
// Because GET should be open to all authenticated users (like admin)

// Mount routes
app.use("/api/cars", carRouter);
app.use("/api/carBrand", carBrandRoutes);
app.use("/api/carModel", carModelRoutes);
app.use("/api/engine", engineRoutes);
/** ✅ PUBLIC ROUTES **/
app.use("/api/auth", authRouter); // <-- only this one is public

/** ⛔️ PROTECTED ROUTES (everything below this needs login) **/
app.use(isAuthenticated); // <-- middleware that checks JWT


// app.use("/api/cars", hasPermission("MANAGE_USERS"), carRouter);

app.use("/api/cars", carRouter);

app.use("/api/users", hasPermission("MANAGE_USERS"), userRouter);
app.use("/api/carModel", hasPermission("MANAGE_CAR_MODELS"), carModelRoutes);
app.use("/api/carBrand", car_brands);

app.use("/api/cart", hasPermission("ACCESS_CART"), cartRoutes);
app.use("/api/orderItem", hasPermission("MANAGE_ORDER_ITEMS"), orderItemRoutes);
app.use("/api/orders", hasPermission("MANAGE_ORDERS"), orderRoutes);

app.use('/api/parts',partRoutes);
app.use('/api/part-categories', partCategoryRoutes); 
app.use("/api/shop", hasPermission("MANAGE_SHOPS"), shopRoutes);
app.use("/api/roles", hasPermission("MANAGE_ROLES"), roleRoutes);
app.use("/api/vin", vinRoutes);

// Database sync and start server
db.sequelize.sync({ alter: true, logging: console.log })
  .then(async () => {
    const Role = db.Role;
    const Permission = db.Permission;

    const permissionsToCreate = Object.entries(PERMISSIONS)
      .filter(([key]) => key !== 'ALL')
      .map(([key, code]) => ({
        code,
        description: key.replaceAll('_', ' ').toLowerCase()
      }));

    await Permission.bulkCreate(permissionsToCreate, { ignoreDuplicates: true });
    const allPermissions = await Permission.findAll();

    const [superAdmin] = await Role.findOrCreate({ where: { name: 'superAdmin' } });
    const [admin] = await Role.findOrCreate({ where: { name: 'admin' } });
    const [shopAdmin] = await Role.findOrCreate({ where: { name: 'shopAdmin' } });

    const getByCodes = (...codes) => allPermissions.filter(p => codes.includes(p.code));

    await superAdmin.setPermissions(allPermissions); // All permissions

    await admin.setPermissions(getByCodes(
      PERMISSIONS.VIEW_SHOP,
      PERMISSIONS.ACCESS_CART
    ));

    await shopAdmin.setPermissions(getByCodes(
      PERMISSIONS.VIEW_SHOP,
      PERMISSIONS.MANAGE_PARTS,
      PERMISSIONS.VIEW_ORDERS,
      PERMISSIONS.MANAGE_ORDERS,
      PERMISSIONS.VIEW_STATS
    ));

    console.log("✅ Permissions et rôles initialisés.");

    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  })
  .catch(console.error);
