const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { PORT } = require('./constants')

dotenv.config({ path: './.env' })

const USER = process.env.db_user
const PASSWORD = process.env.db_password
const NAME = process.env.db_name
const DB = process.env.mongo_connection_string
  .replace('<USER>', USER)
  .replace('<PASSWORD>', PASSWORD)
  .replace('<NAME>', NAME)

mongoose.connect(DB).then(() => console.log('connected to', NAME))

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

const testTour = new Tour({
  name: 'The Forest Hiker',
  rating: 4.7,
  price: 497,
})

testTour.save().then(console.log).catch(console.log)

// server config and init.
app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
