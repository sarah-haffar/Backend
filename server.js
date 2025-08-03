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

const carBrandRoutes = require("./routers/carBrandRoutes");
const userRouter = require("./routers/userRoutes");
const carModelRoutes = require("./routers/carModelRoutes");
const cartRoutes = require("./routers/cartRoutes");
const engineRoutes = require("./routers/engineRoutes");
const orderItemRoutes = require("./routers/orderItemRoutes");
const orderRoutes = require("./routers/orderRoutes");
const partCategoryRoutes = require("./routers/partCategoryRoutes");
const roleRoutes = require("./routers/roleRoutes");
const shopRoutes = require("./routers/shopRoutes");
const roleAdminRoutes = require("./routers/admin/roleRoutes");
const permissionAdminRoutes = require("./routers/admin/permissionRoutes");
const userAdminRoutes = require('./routers/admin/userAdminRoutes');
const adminUsersRouter = require("./routers/adminUsers");
const adminStatsRoutes = require('./routers/admin/adminStatsRoutes');

app.use('/api/admin', adminStatsRoutes);



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api', searchRoute);
app.use("/api/admin/roles", roleAdminRoutes);
app.use("/api/admin/permissions", permissionAdminRoutes);
app.use('/api/admin/users', userAdminRoutes);
app.use("/api/admin", adminUsersRouter);

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
app.use("/api/carBrand", hasPermission("MANAGE_CAR_BRANDS"), carBrandRoutes);
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
    const Permission = db.Permission;
    const PERMISSIONS = require('./config/permissions');

    /** 🟢 Étape 1 – Créer les permissions si elles n’existent pas **/
    const permissionsToCreate = Object.entries(PERMISSIONS)
      .filter(([key]) => key !== 'ALL')
      .map(([key, code]) => ({
        code,
        description: key.replaceAll('_', ' ').toLowerCase()
      }));

    await Permission.bulkCreate(permissionsToCreate, { ignoreDuplicates: true });
    const allPermissions = await Permission.findAll();

    /** 🟢 Étape 2 – Créer les rôles **/
    const [superAdmin, created1] = await Role.findOrCreate({ where: { name: 'superAdmin' } });
    const [admin, created2] = await Role.findOrCreate({ where: { name: 'admin' } });
    const [shopAdmin, created3] = await Role.findOrCreate({ where: { name: 'shopAdmin' } });

    const getByCodes = (...codes) => allPermissions.filter(p => codes.includes(p.code));

    /** 🟢 Étape 3 – Associer les permissions **/
    await superAdmin.setPermissions(allPermissions); // ALL
    await admin.setPermissions(getByCodes(
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.MANAGE_ORDERS,
      PERMISSIONS.MANAGE_PARTS
    ));
    await shopAdmin.setPermissions(getByCodes(
      PERMISSIONS.VIEW_SHOP,
      PERMISSIONS.MANAGE_PRODUCTS,
      PERMISSIONS.VIEW_ORDERS
    ));

    console.log("✅ Permissions et rôles initialisés.");

    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  });


