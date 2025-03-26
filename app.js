const fs = require('node:fs')

const express = require('express')

const TOURS_PATH = `./dev-data/data/tours-simple.json`
const toursData = JSON.parse(fs.readFileSync(TOURS_PATH).toString())
const TOURS = '/api/v1/tours'

const PORT = 3000

const app = express()
app.use(express.json())

app.get(TOURS, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: { tours: toursData },
  })
})

app.post(TOURS, (req, res) => {
  const { id: lastTourId } = toursData[toursData.length - 1]
  const newTour = { id: lastTourId + 1, ...req.body }
  toursData.push(newTour)
  const newToursJson = JSON.stringify(toursData)

  fs.writeFile(TOURS_PATH, newToursJson, (fileWriteError) => {
    if (fileWriteError) console.log(fileWriteError)
    else
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
  })
})

app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
