const db = require('../models');
const Car = db.Car;
const User = db.User;

// Get all cars (optionally include owner)
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      include: [
        { model: User, as: 'owner', attributes: ['id', 'first_name', 'last_name', 'email']
 }
      ]
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'first_name', 'last_name', 'email']
 }
      ]
    });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};

// Create a car for a user
exports.createCar = async (req, res) => {
  try {
    const { userId, make, model, year, engineId } = req.body;  // <-- add engineId

    // Optional: Check if user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const car = await Car.create({ userId, make, model, year, engineId });  // <-- include engineId here
    res.status(201).json(car);
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
};
