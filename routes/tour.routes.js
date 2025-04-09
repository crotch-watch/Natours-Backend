const express = require('express')

const {
  getTour,
  getTours,
  addTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('../controllers/tour.controller')

const tourRouter = express.Router()

tourRouter.param('id', checkId)
tourRouter.route('/').get(getTours).post(checkBody, addTour)

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = tourRouter
