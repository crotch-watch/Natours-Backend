const express = require('express')

const {
  getTour,
  getTours,
  addTour,
  updateTour,
  deleteTour,
} = require('../controllers/tour.controller')

const tourRouter = express.Router()

tourRouter.route('/').get(getTours).post(addTour)
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = tourRouter
