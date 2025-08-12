const db = require('../models');
const Part = db.Part;

exports.getAllParts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const partsResult = await Part.findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      include: [
        { association: 'shop' },
        { association: 'category' }
      ],
      distinct: true // important pour éviter un mauvais count si relations en JOIN
    });

    res.json({
      total: partsResult.count,
      page: parseInt(page),
      limit: parseInt(limit),
      data: partsResult.rows
    });
  } catch (error) {
    console.error('Erreur getAllParts:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id, {
      include: [
        { association: 'shop' },
        { association: 'category' },
        { association: 'compatibilities' },
        { association: 'order_items' },
        { association: 'carts' },
        { association: 'reviews' }
      ]
    });

    if (!part) return res.status(404).json({ message: 'Part not found' });
    res.json(part);
  } catch (error) {
    console.error('Erreur getPartById:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createPart = async (req, res) => {
  try {
    const part = await Part.create(req.body);
    res.status(201).json(part);
  } catch (error) {
    console.error('Erreur createPart:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updatePart = async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });

    await part.update(req.body);
    res.json(part);
  } catch (error) {
    console.error('Erreur updatePart:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.deletePart = async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id);
    if (!part) return res.status(404).json({ message: 'Part not found' });

    await part.destroy();
    res.json({ message: 'Part deleted' });
  } catch (error) {
    console.error('Erreur deletePart:', error);
    res.status(500).json({ error: error.message });
  }
};
