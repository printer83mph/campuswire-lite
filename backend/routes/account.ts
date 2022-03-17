import express from 'express'
import mongoose from 'mongoose'
import isAuthenticated from '../middlewares/isAuthenticated'
import User from '../models/user'

const AccountRouter = express.Router()

AccountRouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    if (await User.exists({ username })) {
      return res.status(400).json({ message: 'User already exists.' })
    }
    await User.validate({ username, password })
    const newUser = new User({ username, password })
    await newUser.save()
    res.status(200).json({ message: 'Account successfully created!' })
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json('Invalid username/password.')
    }
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

AccountRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    // @ts-ignore
    if (req.session.user !== null) {
      return res.status(401).json({ message: 'Already logged in.' })
    }
    const user = await User.findOne({ username })
    if (user === null) {
      return res.status(400).json({ message: 'User not found.' })
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password.' })
    }
    // @ts-ignore
    req.session.user = username
    req.session.save()
    res.status(200).json({ message: 'Successfully logged in!' })
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

AccountRouter.post('/logout', isAuthenticated, (req, res) => {
  // @ts-ignore
  req.session.user = null
  req.session.save()
  console.log('cleared user.')
  console.log(req.session)
  res.status(200).json({ message: 'Successfully logged out!' })
})

export default AccountRouter
