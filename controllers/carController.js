const db = require('../models');
const Car = db.Car;
const User = db.User;
const Part = db.Part;
const Shop = db.Shop;
const PartCompatibility = db.PartCompatibility;

// Get all cars (optionally include owner)
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      include: [
        { model: User, as: 'owner', attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });
    res.json(cars);
  } catch (error) {
    console.error('Erreur getAllCars:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get one car by ID
exports.getCarById = async (req, res) => {
  try {
    console.log(userId)
    const car = await Car.findByPk(req.params.id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'first_name', 'last_name', 'email'] }
      ]
    });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    console.error('Erreur getCarById:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all cars for a specific user
exports.getCarsByUserId = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ association: 'cars' }]
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.cars);
  } catch (error) {
    console.error('Erreur getCarsByUserId:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a car for a user
exports.createCar = async (req, res) => {
  try {
    const { userId, make, model, year, engineId } = req.body;

    // Optional: Check if user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const car = await Car.create({ userId, make, model, year, engineId });
    res.status(201).json(car);
  } catch (error) {
    console.error('Erreur createCar:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update a car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    await car.update(req.body);
    res.json(car);
  } catch (error) {
    console.error('Erreur updateCar:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Erreur deleteCar:', error);
    res.status(500).json({ error: error.message });
  }
};
// Obtenir toutes les pièces compatibles avec les voitures de l'utilisateur
exports.getCompatiblePartsForUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    console.log('User ID:', userId);
    
    // 1. Récupérer toutes les voitures de l'utilisateur
    const userCars = await Car.findAll({
      where: { user_id: userId },
      attributes: ['id', 'make', 'model', 'year', 'engineId'], // ← Keep as engineId (field alias)
      raw: true // ← Add this to get plain objects
    });

    console.log('User cars:', userCars);

    if (!userCars || userCars.length === 0) {
      return res.status(404).json({ 
        message: 'Aucune voiture trouvée pour cet utilisateur' 
      });
    }

    // 2. Extraire les IDs des engines - Fix the field access
    const engineIds = userCars
      .map(car => car.engineId) // ← Use engineId directly from the attributes
      .filter(id => id !== null && id !== undefined); // ← Filter out null/undefined values
    
    console.log('Engine IDs:', engineIds);

    if (engineIds.length === 0) {
      return res.status(404).json({ 
        message: 'Aucun moteur trouvé pour les voitures de cet utilisateur' 
      });
    }

    // 3. Récupérer toutes les pièces compatibles avec ces voitures
    const compatibleParts = await Part.findAll({
      include: [
        {
          model: PartCompatibility,
          as: 'compatibilities',
          where: {
            engine_id: engineIds
          },
          required: true
        },
        {
          model: Shop,
          as: 'shop',
          attributes: ['id', 'name', 'address', 'phone', 'email']
        }
      ],
      distinct: true
    });
    
    console.log('Compatible parts found:', compatibleParts.length);

    // 4. Organiser les données par voiture pour une meilleure lisibilité
    const result = {
      user_cars: userCars,
      compatible_parts: compatibleParts,
      total_parts: compatibleParts.length
    };

    res.json(result);

  } catch (error) {
    console.error('Erreur getCompatiblePartsForUser:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les pièces compatibles pour une voiture spécifique
exports.getCompatiblePartsForCar = async (req, res) => {
  try {
    const carId = req.params.carId;

    // Vérifier que la voiture existe et récupérer son engineId
    const car = await Car.findByPk(carId, {
      attributes: ['id', 'make', 'model', 'year', 'engineId'],
      include: [
        {
          model: Engine,
          as: 'engine',
          attributes: ['id', 'name', 'code']
        }
      ]
    });
    
    if (!car) {
      return res.status(404).json({ message: 'Voiture non trouvée' });
    }

    // Récupérer les pièces compatibles basées sur l'engineId de la voiture
    const compatibleParts = await Part.findAll({
      include: [
        {
          model: PartCompatibility,
          as: 'compatibilities',
          where: { engine_id: car.engineId }, // ← Use engineId consistently
          required: true
        },
        {
          model: Shop,
          as: 'shop',
          attributes: ['id', 'name', 'address', 'phone', 'email']
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json({
      car: car,
      compatible_parts: compatibleParts,
      total_parts: compatibleParts.length
    });

  } catch (error) {
    console.error('Erreur getCompatiblePartsForCar:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les magasins qui vendent des pièces pour les voitures de l'utilisateur
exports.getShopsForUserCars = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    // 1. Récupérer les voitures de l'utilisateur
    const userCars = await Car.findAll({
      where: { user_id: userId },
      attributes: ['id', 'make', 'model', 'year', 'engineId'],
      raw: true
    });

    if (!userCars || userCars.length === 0) {
      return res.status(404).json({ 
        message: 'Aucune voiture trouvée pour cet utilisateur' 
      });
    }

    const engineIds = userCars
      .map(car => car.engineId)
      .filter(id => id !== null && id !== undefined);

    // 2. Récupérer tous les magasins qui ont des pièces compatibles
    const shopsWithParts = await Shop.findAll({
      include: [
        {
          model: Part,
          as: 'parts',
          include: [
            {
              model: PartCompatibility,
              as: 'compatibilities',
              where: { engine_id: engineIds },
              required: true
            }
          ],
          required: true
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'first_name', 'last_name', 'email']
        }
      ],
      distinct: true
    });

    res.json({
      user_cars: userCars,
      shops: shopsWithParts,
      total_shops: shopsWithParts.length
    });

  } catch (error) {
    console.error('Erreur getShopsForUserCars:', error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les recommandations de pièces basées sur les voitures de l'utilisateur
exports.getPartRecommendationsForUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const { page = 1, limit = 20, categoryId } = req.query;
    const offset = (page - 1) * limit;

    // 1. Récupérer les voitures de l'utilisateur
    const userCars = await Car.findAll({
      where: { user_id: userId },
      attributes: ['id', 'make', 'model', 'year', 'engineId'],
      raw: true
    });

    if (!userCars || userCars.length === 0) {
      return res.status(404).json({ 
        message: 'Aucune voiture trouvée pour cet utilisateur' 
      });
    }

    const engineIds = userCars
      .map(car => car.engineId)
      .filter(id => id !== null && id !== undefined);

    // 2. Construire les conditions de recherche
    const includeConditions = [
      {
        model: PartCompatibility,
        as: 'compatibilities',
        where: { engine_id: engineIds },
        required: true
      },
      {
        model: Shop,
        as: 'shop',
        attributes: ['id', 'name', 'address', 'phone']
      }
    ];

    // Ajouter un filtre par catégorie si spécifié
    const whereConditions = {};
    if (categoryId) {
      whereConditions.category_id = categoryId;
    }

    // 3. Récupérer les pièces avec pagination
    const partsResult = await Part.findAndCountAll({
      where: whereConditions,
      include: includeConditions,
      offset: parseInt(offset),
      limit: parseInt(limit),
      distinct: true,
      order: [['created_at', 'DESC']]
    });

    res.json({
      user_cars: userCars,
      recommendations: {
        total: partsResult.count,
        page: parseInt(page),
        limit: parseInt(limit),
        data: partsResult.rows
      }
    });

  } catch (error) {
    console.error('Erreur getPartRecommendationsForUser:', error);
    res.status(500).json({ error: error.message });
  }
};