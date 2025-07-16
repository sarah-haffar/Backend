const express = require('express');
const app = express();
const db = require('./models');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import des routes
const userRoutes = require('./routers/userRoutes');
const roleRoutes = require('./routers/roleRoutes');
const shopRoutes = require('./routers/shopRoutes');
const reviewRoutes = require('./routers/reviewRoutes');
const recommendationRoutes = require('./routers/recommandationRoutes');
const orderRoutes = require('./routers/orderRoutes');
const orderItemRoutes = require('./routers/orderItemRoutes');
const partRoutes = require('./routers/partRoutes');
const partCategoryRoutes = require('./routers/partCategoryRoutes');
const partCompatibilityRoutes = require('./routers/partCompatibilityRoutes');
const engineRoutes = require('./routers/engineRoutes');
const cartRoutes = require('./routers/cartRoutes');
const carBrandRoutes = require('./routers/carBrandRoutes');
const carModelRoutes = require('./routers/carModelRoutes');

// Utilisation des routes
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/shops', shopRoutes);
app.use('/reviews', reviewRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/parts', partRoutes);
app.use('/part-categories', partCategoryRoutes);
app.use('/part-compatibilities', partCompatibilityRoutes);
app.use('/engines', engineRoutes);
app.use('/carts', cartRoutes);
app.use('/car-brands', carBrandRoutes);
app.use('/car-models', carModelRoutes);

// Connexion à la base + lancement du serveur
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('✅ Server is running on port 3000');
  });
});
