// controllers/recommandationController.js
const Recommandation = db.Recommandation;

exports.getAllRecommandations = async (req, res) => {
  try {
    const recommandations = await Recommandation.findAll();
    res.json(recommandations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecommandation = async (req, res) => {
  try {
    const recommandation = await Recommandation.create(req.body);
    res.status(201).json(recommandation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};