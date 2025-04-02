const fs = require("node:fs")

const { toursData, TOURS_PATH } = require("../constants")

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: { tours: toursData },
  })
}

exports.getTour = (req, res) => {
  const id = +req.params.id

  if (id > toursData.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No ID found.',
    })
  }

  const reqTour = toursData.find((tour) => tour.id === id)

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
  const id = +req.params.id
  const { body } = req

  if (id > toursData.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No ID found.',
    })
  }

  const updateTour = toursData.find((tour) => tour.id === id)

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
  const id = +req.params.id

  if (id > toursData.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No ID found.',
    })
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
}
