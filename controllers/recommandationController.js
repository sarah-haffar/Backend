const db = require('../models');
const Recommendation = db.Recommendation;

exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.findAll({
      include: [
        { association: 'user' },
        { association: 'part' }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByPk(req.params.id, {
      include: [
        { association: 'user' },
        { association: 'part' }
      ]
    });
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.create(req.body);
    res.status(201).json(recommendation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByPk(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    await recommendation.update(req.body);
    res.json(recommendation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByPk(req.params.id);
    if (!recommendation) return res.status(404).json({ message: 'Recommendation not found' });

    await recommendation.destroy();
    res.json({ message: 'Recommendation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
