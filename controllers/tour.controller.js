const Tour = require('../models/tour.model')

exports.checkId = (req, res, next, id) => {
  // if (+id > toursData.length) {
  //   return res.status(400).send({
  //     status: 'error',
  //     message: 'Invalid ID',
  //   })
  // }
  next()
}

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: tour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    })
  }
}

exports.getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find()

    res.status(200).json({
      status: 'success',
      data: tours,
      results: tours.length,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    })
  } finally {
    next()
  }
}

exports.getTour = async (req, res) => {
  const { id } = req.params

  try {
    const tour = await Tour.findById(id)

    res.status(200).json({
      status: 'success',
      data: tour,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    })
  }
}

exports.addTour = (req, res) => {
  // const { id: lastTourId } = toursData[toursData.length - 1]
  // const newTour = { id: lastTourId + 1, ...req.body }
  // toursData.push(newTour)
  // const newToursJson = JSON.stringify(toursData)
  // fs.writeFile(TOURS_PATH, newToursJson, (fileWriteError) => {
  //   if (fileWriteError) console.log(fileWriteError)
  //   else
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     })
  // })
}

exports.updateTour = async (req, res) => {
  const {
    body,
    params: { id },
  } = req

  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: updatedTour,
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    })
  }
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
