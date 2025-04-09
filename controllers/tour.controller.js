const fs = require('node:fs')

const { toursData, TOURS_PATH } = require('../constants')

exports.checkId = (req, res, next, id) => {
  if (+id > toursData.length) {
    return res.status(400).send({
      status: 'error',
      message: 'Invalid ID',
    })
  }
  next()
}

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: { tours: toursData },
  })
}

exports.getTour = (req, res) => {
  const { id } = req.params
  const reqTour = toursData.find((tour) => tour.id === +id)

  res.status(200).json({
    requestedAt: req.reqestedAt,
    status: 'success',
    data: {
      tour: reqTour,
    },
  })
}

exports.addTour = (req, res) => {
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
}

exports.updateTour = (req, res) => {
  const {
    body,
    params: { id },
  } = req

  const updateTour = toursData.find((tour) => tour.id === +id)

  Object.entries(body).forEach(([key, value]) => {
    updateTour[key] = value
  })

  res.status(200).json({
    status: 'success',
    data: {
      tour: updateTour,
    },
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body
  if (!name || !price) res.status(404).send('Missing name or price')
  else next()
}
