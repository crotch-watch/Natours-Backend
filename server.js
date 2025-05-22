const app = require('./app')
const dotenv = require('dotenv')

const { PORT } = require('./constants')
const mongoose = require('mongoose')

dotenv.config({ path: './.env' })

const USER = process.env.db_user
const PASSWORD = process.env.db_password
const NAME = process.env.db_name
const DB = process.env.mongo_connection_string
  .replace('<USER>', USER)
  .replace('<PASSWORD>', PASSWORD)
  .replace('<NAME>', NAME)

mongoose.connect(DB).then(() => console.log('connection with DB established.'))

// server config and init.
app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
