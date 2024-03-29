const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

// Render the order form
router.get('/new', (req, res) => {
  res.render('orderViews/orderForm') // Assuming you have an orderForm.hbs file in your views directory
})

// Create a new order
router.post('/', orderController.createOrder)

// Render the list of orders
router.get('/', async (req, res) => {
  try {
    const orders = await orderController.getAllOrders()
    res.render('orderList', { orders }) // Assuming you have an orderList.hbs file in your views directory
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Render order details by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await orderController.getOrderById(req.params.id)
    res.render('orderDetails', { order }) // Assuming you have an orderDetails.hbs file in your views directory
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Render order edit form by ID
router.get('/:id/edit', async (req, res) => {
  try {
    const order = await orderController.getOrderById(req.params.id)
    res.render('orderEditForm', { order }) // Assuming you have an orderEditForm.hbs file in your views directory
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Update order by ID
router.put('/:id', orderController.updateOrderById)

// Delete order by ID
router.delete('/:id', orderController.deleteOrderById)

module.exports = router
