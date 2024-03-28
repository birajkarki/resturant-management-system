const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController')

// Route to render createReservation.hbs
router.get('/create', (req, res) => {
  res.render('reservationViews/createReservation')
})

// Route to render reservationList.hbs
router.get('/reservationList', reservationController.renderReservationList)

// Routes for CRUD operations on reservations
router.post('/create', reservationController.createReservation)
router.get('/', reservationController.getAllReservations)
router.get('/:id', reservationController.getReservationById)
router.put('/:id', reservationController.updateReservationById)
router.post('/:id/delete', reservationController.deleteReservationById)

module.exports = router
