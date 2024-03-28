const Reservation = require('../models/Reservation')

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const {
      customerName,
      reservationDate,
      numberOfPeople,
      phoneNumber,
      tableNumber,
    } = req.body

    const reservation = new Reservation({
      customerName,
      reservationDate,
      numberOfPeople,
      phoneNumber,
      tableNumber,
    })

    await reservation.save()
    res.status(201).send('Reservation created successfully')
  } catch (error) {
    console.error('Error creating reservation:', error.message)
    res.status(500).send('Error creating reservation')
  }
}

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
    res.status(200).json(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error.message)
    res.status(500).send('Error fetching reservations')
  }
}

// Get a single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
      return res.status(404).send('Reservation not found')
    }
    res.status(200).json(reservation)
  } catch (error) {
    console.error('Error fetching reservation:', error.message)
    res.status(500).send('Error fetching reservation')
  }
}

// Update a reservation by ID
exports.updateReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!reservation) {
      return res.status(404).send('Reservation not found')
    }
    res.status(200).json(reservation)
  } catch (error) {
    console.error('Error updating reservation:', error.message)
    res.status(500).send('Error updating reservation')
  }
}

// Delete a reservation by ID
exports.deleteReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id)
    if (!reservation) {
      return res.status(404).send('Reservation not found')
    }
    res.status(200).send('Reservation deleted successfully')
  } catch (error) {
    console.error('Error deleting reservation:', error.message)
    res.status(500).send('Error deleting reservation')
  }
}

// Render the reservation list view
exports.renderReservationList = async (req, res) => {
  try {
    const reservations = await Reservation.find()
    res.render('reservationViews/reservationList', { reservations })
  } catch (error) {
    console.error('Error fetching reservations:', error.message)
    res.status(500).send('Error fetching reservations')
  }
}
