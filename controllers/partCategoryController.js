const db = require('../models');
const PartCategory = db.PartCategory;
const Part = db.Part;
const { Op } = require('sequelize'); // pour Op.notIn

// Récupérer toutes les catégories avec enfants
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await PartCategory.findAll({
      include: [{ model: PartCategory, as: 'children' }]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await PartCategory.findByPk(req.params.id, {
      include: [{ model: PartCategory, as: 'children' }]
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer 3 catégories avec children vide
exports.getThreeCategories = async (req, res) => {
  try {
    const categories = await PartCategory.findAll({
      limit: 3,
      order: [['id', 'ASC']]
    });

    const formatted = categories.map(cat => ({
      id: cat.id,
      parent_id: cat.parent_id || null,
      name: cat.name,
      description: cat.description || null,
      image_url: cat.image_url || null,
      created_at: cat.created_at,
      updated_at: cat.updated_at,
      children: []
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API pour ML Categories (10 produits max par catégorie)
exports.getMLCategories = async (req, res) => {
  try {
    // Simuler la sortie ML : IDs des catégories pour chaque ensemble
    const mlCategoryIds = {
      Featured: [1, 3, 5],
      MostWanted: [2, 4, 6],
      Recommended: [7, 8, 9]
    };

    const result = {};

    for (const [categorySet, categoryIds] of Object.entries(mlCategoryIds)) {
      const categories = await PartCategory.findAll({
        where: { id: categoryIds }
      });

      const categoriesWithProducts = await Promise.all(
        categories.map(async (cat) => {
          const products = await Part.findAll({
            where: { category_id: cat.id },
            limit: 10
          });

          return {
            id: cat.id,
            name: cat.name,
            parent_id: cat.parent_id || null,
            description: cat.description || null,
            image_url: cat.image_url || null,
            created_at: cat.created_at,
            updated_at: cat.updated_at,
            children: products.map(p => ({
              id: p.id,
              name: p.name,
              price: p.price,
              description: p.description || null,
              image_url: p.image_url || null,
              created_at: p.created_at,
              updated_at: p.updated_at
            }))
          };
        })
      );

      result[categorySet] = categoriesWithProducts;
    }

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les produits restants d'une catégorie ML
exports.getRemainingProducts = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (!categoryId) return res.status(400).json({ message: "Invalid category ID" });

    // Produits déjà affichés dans ML (simulé)
    const displayedProductIds = await getDisplayedProductsByCategory(categoryId);

    const remainingProducts = await Part.findAll({
      where: {
        category_id: categoryId,
        id: { [Op.notIn]: displayedProductIds }
      }
    });

    res.json({
      category_id: categoryId,
      remaining_count: remainingProducts.length,
      products: remainingProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description || null,
        image_url: p.image_url || null,
        created_at: p.created_at,
        updated_at: p.updated_at
      }))
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Simuler les 10 produits ML déjà affichés par catégorie
async function getDisplayedProductsByCategory(categoryId) {
  const mlDisplayed = {
    1: [1,2,3,4,5,6,7,8,9,10],
    2: [11,12,13,14,15,16,17,18,19,20],
    3: [21,22,23,24,25,26,27,28,29,30],
    4: [31,32,33,34,35,36,37,38,39,40],
    5: [41,42,43,44,45,46,47,48,49,50]
  };
  return mlDisplayed[categoryId] || [];
}

// CRUD standard des catégories
exports.createCategory = async (req, res) => {
  try {
    const category = await PartCategory.create({
      ...req.body,
      created_at: new Date()
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await PartCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await PartCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
