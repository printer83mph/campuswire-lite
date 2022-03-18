import express, { ErrorRequestHandler } from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import AccountRouter from './routes/account'
import ApiRouter from './routes/api'

const PROD = process.env.NODE_ENV === 'production'

// development vars
require('dotenv').config()

// connect to mongo db
mongoose.connect(process.env.MONGO_URI as string)

const app = express()

const oneDay = 1000 * 60 * 60 * 24

// initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay * 15,
      secure: PROD,
    },
  })
)

app.use(bodyParser.json())

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    res.status(500)
  }
  res.json({ message: err.message || 'An unexpected error occurred.' })
}

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Now listening on port ${process.env.PORT}`)
})
