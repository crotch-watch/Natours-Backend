const app = require('./app')
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

// server config and init.
app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
