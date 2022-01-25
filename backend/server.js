require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const AccountRouter = require('./routes/account');
const ApiRouter = require('./routes/api');

// connect to mongo db
mongoose.connect(process.env.MONGO_URI);

const app = express();

// initialize session
app.use(session({
  secret: process.env.BACKEND_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV },
}));

app.use('/account', AccountRouter);
app.use('/api', ApiRouter);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Now listening on port ${process.env.BACKEND_PORT}`);
});
