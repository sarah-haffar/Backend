const db = require('../models');
const PartCompatibility = db.PartCompatibility;

exports.getAllCompatibilities = async (req, res) => {
  try {
    const compatibilities = await PartCompatibility.findAll();
    res.json(compatibilities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCompatibilityById = async (req, res) => {
  const { part_id, engine_id } = req.params;

  try {
    const compatibility = await PartCompatibility.findOne({
      where: { part_id, engine_id }
    });

    if (!compatibility)
      return res.status(404).json({ message: 'Compatibility not found' });

    res.json(compatibility);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCompatibility = async (req, res) => {
  try {
    const compatibility = await PartCompatibility.create(req.body);
    res.status(201).json(compatibility);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompatibility = async (req, res) => {
  const { part_id, engine_id } = req.params;

  try {
    const compatibility = await PartCompatibility.findOne({
      where: { part_id, engine_id }
    });

    if (!compatibility)
      return res.status(404).json({ message: 'Compatibility not found' });

    await compatibility.update(req.body);
    res.json(compatibility);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCompatibility = async (req, res) => {
  const { part_id, engine_id } = req.params;

  try {
    const compatibility = await PartCompatibility.findOne({
      where: { part_id, engine_id }
    });

    if (!compatibility)
      return res.status(404).json({ message: 'Compatibility not found' });

    await compatibility.destroy();
    res.json({ message: 'Compatibility deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

