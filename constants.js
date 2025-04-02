const fs = require('node:fs')

exports.TOURS_PATH = `./dev-data/data/tours-simple.json`
exports.toursData = JSON.parse(fs.readFileSync(exports.TOURS_PATH).toString())
exports.TOURS = '/api/v1/tours'
exports.USERS = '/api/v1/users'
exports.INTERNAL_SERVER_ERROR = 500
exports.PORT = 3000
