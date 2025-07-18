// controllers/carModelController.js
const db = require('../models');  // Import the db object (adjust path if needed)

const CarModel = db.CarModel;

exports.getAllCarModels = async (req, res) => {
  try {
    const models = await CarModel.findAll();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCarModelById = async (req, res) => {
  try {
    const model = await CarModel.findByPk(req.params.id);
    if (!model) return res.status(404).json({ message: 'Brand not found' });
    res.json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createCarModel = async (req, res) => {
  try {
    const model = await CarModel.create(req.body);
    res.status(201).json(model);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.updateCarModel = async (req, res) => {
  try {
    const model = await CarModel.findByPk(req.params.id);
    if (!model) return res.status(404).json({ message: 'Brand not found' });

    await model.update(req.body);
    res.json(model);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCarModel = async (req, res) => {
  try {
    const model = await CarModel.findByPk(req.params.id);
    if (!model) return res.status(404).json({ message: 'Brand not found' });

    await brand.destroy();
    res.json({ message: 'Brand deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};