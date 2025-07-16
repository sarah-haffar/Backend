// controllers/partCategoryController.js
const PartCategory = db.PartCategory;

exports.getAllPartCategories = async (req, res) => {
  try {
    const categories = await PartCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPartCategory = async (req, res) => {
  try {
    const category = await PartCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
