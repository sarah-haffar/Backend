const db = require('../models');
const OrderItem = db.OrderItem;

exports.getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Order item not found' });

    await item.destroy();
    res.json({ message: 'Order item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
