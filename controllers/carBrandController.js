// controllers/carBrandController.js
const db = require('../models');
const CarBrand = db.CarBrand;

exports.getAllCarBrands = async (req, res) => {
  try {
    const brands = await CarBrand.findAll();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCarBrandById = async (req, res) => {
  try {
    const brand = await CarBrand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCarBrand = async (req, res) => {
  try {
    const brand = await CarBrand.create(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCarBrand = async (req, res) => {
  try {
    const brand = await CarBrand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    await brand.update(req.body);
    res.json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCarBrand = async (req, res) => {
  try {
    const brand = await CarBrand.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    await brand.destroy();
    res.json({ message: 'Brand deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
