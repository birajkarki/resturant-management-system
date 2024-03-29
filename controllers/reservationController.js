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
    // Log the user ID to the console
    console.log('User ID:', req.user._id)
    console.log('User ID (alternative):', req.user.id)
    // Ensure that all required fields are provided
    if (
      !customerName ||
      !reservationDate ||
      !numberOfPeople ||
      !phoneNumber ||
      !tableNumber
    ) {
      return res.status(400).send('All fields are required')
    }

    // Create the reservation object
    const reservation = new Reservation({
      customerName,
      reservationDate,
      numberOfPeople,
      phoneNumber,
      tableNumber,
      createdBy: req.user._id || req.user.id, // Use whichever works for you
    })

    // Save the reservation to the database
    await reservation.save()
    res.redirect('/dashboard')
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
    res.redirect('/dashboard')
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
