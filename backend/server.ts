require('dotenv').config()

import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'

import AccountRouter from './routes/account'
import ApiRouter from './routes/api'

// connect to mongo db
mongoose.connect(process.env.MONGO_URI as string)

const app = express()

// initialize session
app.use(
  session({
    secret: process.env.BACKEND_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV !== 'DEVELOPMENT' },
  })
)

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Now listening on port ${process.env.BACKEND_PORT}`)
})
