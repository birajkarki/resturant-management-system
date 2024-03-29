const Order = require('../models/Order')

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body)
    res.status(201).json(newOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Get all orders
exports.getAllOrders = async () => {
  try {
    return await Order.find()
  } catch (err) {
    throw new Error(err.message)
  }
}

// Get order by ID
exports.getOrderById = async (orderId) => {
  try {
    return await Order.findById(orderId)
  } catch (err) {
    throw new Error(err.message)
  }
}

// Update order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(updatedOrder)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json({ message: 'Order deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
