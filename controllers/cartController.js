// controllers/cartController.js
const db = require('../models');
const Cart = db.Cart;

// Récupérer tous les paniers
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un panier par ID
exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un panier
exports.createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un panier
exports.updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' });
    }

    await cart.update(req.body);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un panier
exports.deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Panier non trouvé' });
    }

    await cart.destroy();
    res.json({ message: 'Panier supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
