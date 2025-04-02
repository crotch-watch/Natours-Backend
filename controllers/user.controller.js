const { INTERNAL_SERVER_ERROR } = require('../constants')

exports.getAllUsers = (req, res) => {
  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'route not found',
  })
}

exports.createUser = (req, res) => {
  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'route not found',
  })
}

exports.updateUser = (req, res) => {
  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'route not found',
  })
}

exports.getUser = (req, res) => {
  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'route not found',
  })
}

exports.deleteUser = (req, res) => {
  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'route not found',
  })
}
