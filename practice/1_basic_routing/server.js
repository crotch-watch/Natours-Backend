/** @todo This follows the pattern
 *    1. setup
 *    2. config
 *    3. consume
 * */

/** importing express to initialize the app */
const express = require('express')

const morgan = require('morgan')

/** initialize the app */
const app = express()

/** @todo from middle ware I mean transformers functions or implementations that transforms
 *     data between it's source or wherever it's available initially to where it's consumed.
 * */
/** @todo application wide middleware are those which are scoped to entire application
 *    i.e. instance of the current express app.
 *    @example const app = express()
 *    morgan is an application level middleware as it's on entire app as well as
 *
 * */

/** consume custom middleware */
app.use(morgan('dev'))

/**
 * @todo middleware which is mounted first will be executed first
 *   these logger are app. scoped. if they did any transformations to the req or res
 *   those would be to the source req or res i.e. app-wide.
 * */

const beforeHandler = (_req, _res, next) => {
  console.info('before handler')
  next()
}

const afterHandler = (_req, _res, next) => {
  console.info('after handler')
  next()
}

app.use(afterHandler)
app.use(beforeHandler)

/** express router */
const expressRouter = express.Router()
expressRouter.get('/users', (_req, res) => {
  res.status(SUCCESS).send('get users')
})

/** @todo since expressRouter is valid middleware meaning it also returns a handler fn. */
/** @todo as I'm already mounting the router usersRouter on app with route:/users
 *    that would add as a base path for this as in rather than /users being localhost/users
 *    it'd be localhost/users/users.
 * */
/** @todo app.use middleware of similar fn. will always be exec. first making the router or any other middleware's base
 *    base as in path: localhost/base/path rather than localhost:path in this case. be mindful of this debugging express.
 * */

app.use('/users', expressRouter)

const SUCCESS = 200

/** config the routes */
app
  .get('/', (_req, res) => {
    res.status(SUCCESS).send('GET')
  })
  .post('/', (_req, res) => {
    res.status(SUCCESS).send('POST')
  })

/**
 *@todo code repetition rather I can set a route
 *  then all requests on that route can be provided
 * */

app
  .route('/')
  .get((_req, res) => res.status(SUCCESS).send('GET'))
  .post((_req, res) => res.status(SUCCESS).send('POST'))

/**
 * @todo app.route returns an obj. which can used as a router for methods
 *   HTTP methods to be used on them.
 * */

const router = app.route('/')
router
  .get((_req, res) => res.status(SUCCESS).send('GET'))
  .post((_req, res) => res.status(SUCCESS).send('POST'))

/**
 * @todo there can be 2 ways implement this
 *   1. either export router and use in other modules
 *   2. export handlers from another module and use them here
 *   it makes more sense to de couple the code i.e. handlers should not be concerned with implementing routing
 *   routing should be handled somewhere else maybe here.
 * */

const usersRouter = app.route('/users')
usersRouter.get((_req, res) => res.status(SUCCESS).send('get users'))

/** server config. */
const PORT = 8080
app.listen(PORT, () => {
  console.info(`Listening PORT@${PORT}`)
})
