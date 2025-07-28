// controllers/engineController.js
const db = require('../models');
const Engine = db.Engine;
exports.getAllEngines = async (req, res) => {
  try {
    const engines = await Engine.findAll({
      include: [
        {
          association: 'car_model',
          include: ['brand'] // optional: if you want the brand as well
        },
        {
          association: 'cars' // if defined: Engine.hasMany(Car, { as: 'cars' })
        }
      ]
    });
    res.json(engines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEngineById = async (req, res) => {
  try {
    const engine = await Engine.findByPk(req.params.id, {
      include: [
        {
          association: 'car_model',
          include: ['brand']
        },
        {
          association: 'cars'
        }
      ]
    });

    if (!engine) {
      return res.status(404).json({ error: 'Moteur non trouvé' });
    }

    res.json(engine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un moteur
exports.createEngine = async (req, res) => {
  try {
    const engine = await Engine.create(req.body);
    res.status(201).json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un moteur
exports.updateEngine = async (req, res) => {
  try {
    const engine = await Engine.findByPk(req.params.id);
    if (!engine) {
      return res.status(404).json({ error: 'Moteur non trouvé' });
    }

    await engine.update(req.body);
    res.json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un moteur
exports.deleteEngine = async (req, res) => {
  try {
    const engine = await Engine.findByPk(req.params.id);
    if (!engine) {
      return res.status(404).json({ error: 'Moteur non trouvé' });
    }

    await engine.destroy();
    res.json({ message: 'Moteur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
