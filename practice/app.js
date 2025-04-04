// this is to build a small app/apps to check recollection and consolidate
const { log } = require('console')
const express = require('express')
const app = express()

// custom middleware
const morgan = require('morgan')
// it's implemented here but used at res.end() @"dev"
app.use(morgan('common'))

// middleware order of exec.
app.use((req, res, next) => {
  console.log('1')
  req.auth = null
  next()
})

const ROUTE = '/'

// order of exec. won't as it will fall directly to corresponding route
app
  .route(ROUTE)
  .post((_, res) => {
    res.send("/ send")
    log('4')
  })
  .get(() => log('3'))

// if next isn't invoked in custom middleware won't proceed further
app.use((req, res, next) => {
  log('5')
  next()
})

app.post(ROUTE + '1', (req, res) => {
  res.send('Okay')
})

app.use((req, res, next) => {
  console.log('2')
  res.auth = null
  next()
})

const PORT = 3000
const HOSTNAME = '127.0.0.1'
app.listen(PORT, HOSTNAME, (serverInitError) => {
  console.log(serverInitError || 'Listening at', PORT, HOSTNAME)
})
