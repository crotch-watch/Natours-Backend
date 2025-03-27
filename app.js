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
    data: { tours: toursData }
  })
})

app.get(TOURS + '/:id', (req, res) => {
  const id = +req.params.id

  if (id > toursData.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No ID found.'
    })
  }

  const reqTour = toursData.find((tour) => tour.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour: reqTour
    }
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
          tour: newTour
        }
      })
  })
})

app.patch(TOURS + '/:id', (req, res) => {
  const id = +req.params.id
  const { body } = req

  if (id > toursData.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No ID found.'
    })
  }

  const updateTour = toursData.find((tour) => tour.id === id)

  Object.entries(body).forEach(([key, value]) => {
    updateTour[key] = value
  })

  res.status(200).json({
    status: 'success',
    data: {
      tour: updateTour
    }
  })
})

app.listen(PORT, (startupError) => {
  if (startupError) console.log('Error starting server :', startupError)
  else console.log('Listening on port ', PORT)
})
