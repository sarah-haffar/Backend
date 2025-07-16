// controllers/partCompatibilityController.js
const PartCompatibility = db.PartCompatibility;

exports.getAllPartCompatibilities = async (req, res) => {
  try {
    const pcs = await PartCompatibility.findAll();
    res.json(pcs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPartCompatibility = async (req, res) => {
  try {
    const pc = await PartCompatibility.create(req.body);
    res.status(201).json(pc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

