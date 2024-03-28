const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    reservationDate: {
      type: Date,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    // Add more fields as needed
  },
  { timestamps: true }
)

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation
