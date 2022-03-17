import express, { ErrorRequestHandler } from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import AccountRouter from './routes/account'
import ApiRouter from './routes/api'

require('dotenv').config()

// connect to mongo db
mongoose.connect(process.env.MONGO_URI as string)

const app = express()

// initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV !== 'DEVELOPMENT' },
  })
)

app.use(bodyParser.json())

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: 'Something went wrong.' })
}

app.use(errorHandler)

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Now listening on port ${process.env.BACKEND_PORT}`)
})
