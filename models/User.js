const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },
  // You can include additional fields here as needed for GitHub profile information
})

const User = mongoose.model('User', userSchema)

module.exports = User
