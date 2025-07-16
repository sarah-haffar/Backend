// controllers/orderItemController.js
const OrderItem = db.OrderItem;

exports.getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
