const mongoose = require('mongoose')

const toursSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'tour must have a price'],
  },
})

const Tour = mongoose.model('Tours', toursSchema)

module.exports = Tour
