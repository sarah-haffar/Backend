// controllers/partController.js
const Part = db.Part;

exports.getAllParts = async (req, res) => {
  try {
    const parts = await Part.findAll();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPart = async (req, res) => {
  try {
    const part = await Part.create(req.body);
    res.status(201).json(part);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};