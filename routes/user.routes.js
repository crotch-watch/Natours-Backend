const express = require('express')

const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser)

module.exports = userRouter
