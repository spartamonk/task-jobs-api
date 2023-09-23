require('dotenv').config()
require('express-async-errors')

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const {
  authMiddleware,
  errorHandlerMiddlware,
  notFoundMiddleware,
} = require('./middlewares')
const authRouter = require('./routers/auth')
const jobsRouter = require('./routers/jobs')
// middlewares
// app security
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())
// parse json

app.use(express.json())
// parse static files
app.get('/', (req, res)=> {
  res.send(200).send('<h1>Jobs API</h1><a href="/api-docs"></a>')
})
// swaggerUI

// routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleware, jobsRouter)
// not-found
app.use(notFoundMiddleware)
// error-handler
app.use(errorHandlerMiddlware)
// start
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()
