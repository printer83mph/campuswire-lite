import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import isAuthenticated, {
  isNotAuthenticated,
} from '../middlewares/isAuthenticated'
import User from '../models/user'

const AccountRouter = express.Router()

AccountRouter.post(
  '/signup',
  isNotAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body
    if (await User.exists({ username })) {
      res.status(400)
      throw new Error('User already exists.')
    }
    await User.validate({ username, password }).catch(() => {
      res.status(400)
      throw new Error('Invalid username/password.')
    })
    const newUser = new User({ username, password })
    await newUser.save()
    res.status(200).json({ message: 'Account successfully created!' })
  })
)

AccountRouter.post(
  '/login',
  isNotAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (user === null) {
      res.status(400)
      throw new Error('Username not found.')
    }
    if (user.password !== password) {
      res.status(401)
      throw new Error('Invalid password.')
    }
    // @ts-ignore
    req.session.user = username
    res.status(200).json({ message: 'Successfully logged in!' })
  })
)

AccountRouter.post('/logout', isAuthenticated, (req, res) => {
  // @ts-ignore
  req.session.user = null
  res.status(200).json({ message: 'Successfully logged out!' })
})

export default AccountRouter
