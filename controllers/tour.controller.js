const Tour = require('../models/tour.model')

const {
  STATUS: { OK, CREATED, NO_CONTENT, BAD_REQUEST }
} = require('../constants.js')

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)

    res.status(CREATED).json({
      status: 'success',
      data: {
        tour: tour
      }
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: 'error',
      message: error
    })
  }
}

exports.getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find()

    res.status(OK).json({
      status: 'success',
      data: tours,
      results: tours.length
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: 'error',
      message: error
    })
  } finally {
    next()
  }
}

exports.getTour = async (req, res) => {
  const { id } = req.params

  try {
    const tour = await Tour.findById(id)

    res.status(OK).json({
      status: 'success',
      data: tour
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: 'error',
      message: error
    })
  }
}

/**
 *  @todo tours is searched against req.id and whatever is passed in body is updated
 *    only if the values or format is valid since they'll be validated runValidators: true
 *    NOTE: this update is of type PATCH resource will only be modified
 *    if PUT method were used it'd replace entire underlying tour or resource.
 * */

exports.updateTour = async (req, res) => {
  const {
    body,
    params: { id }
  } = req

  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    })

    res.status(OK).json({
      status: 'success',
      data: updatedTour
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: 'error',
      message: error
    })
  }
}

exports.deleteTour = async (req, res) => {
  const { id } = req.params

  /** @todo there could be 2 approaches
   *    1.
   *      checking for id for validations before passing it into query
   *      there could be a lot of data and some complex validations let's assume my data has 10 fields
   *      and there validations require complex analysis so some simple validations ex. is non nullish
   *      might be beneficial.
   *    2.
   *      mongoose handles validation itself so it could be left as well.
   *    NOTE: since validations validators would be assumably optimized they'll handle it better.
   */

  try {
    await Tour.findByIdAndDelete(id)

    res.status(NO_CONTENT).json({
      status: 'success',
      data: null
    })
  } catch (error) {
    res.status(BAD_REQUEST).json({
      status: 'error',
      message: error.message
    })
  }
}
