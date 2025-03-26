const fs = require('node:fs')

const express = require('express')

const TOURS_PATH = `./dev-data/data/tours-simple.json`
const toursData = JSON.parse(fs.readFileSync(TOURS_PATH).toString())
const TOURS = '/api/v1/tours'

const PORT = 3000

const app = express()

app.get(TOURS, (req, res) => {
  res.status(200).json({
    status: 'success',
    result: toursData.length,
    data: { tours: toursData },
  })
})

app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
