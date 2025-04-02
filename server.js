const app  = require('./app')

const { PORT } = require('./constants')

// server config and init.
app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
