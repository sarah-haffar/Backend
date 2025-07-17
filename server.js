const express = require("express");
const app = express();
const db = require("./models");
const userRouter = require("./routers/userRoutes"); // Make sure filename is exactly userRoutes.js
const authRouter = require("./routers/auth"); // Make sure filename is exactly userRoutes.js
const carModelRoutes = require("./routers/carModelRoutes"); // Make sure filename is exactly userRoutes.js

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount user routes on /api/users
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth", carModelRoutes);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
