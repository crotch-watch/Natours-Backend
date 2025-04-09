const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tour.routes')
const userRouter = require('./routes/user.routes')

const { TOURS, USERS } = require('./constants')

const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public/'))

// middleware is exec in order of declaration
app.use((req, res, next) => {
  req.reqestedAt = new Date().toISOString()
  // next invocation is required to advance the exec
  next()
})

app.use(TOURS, tourRouter).use(USERS, userRouter)

module.exports = app
