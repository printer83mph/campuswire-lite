import express from 'express'

const AccountRouter = express.Router()

AccountRouter.post('/signup', (req, res) => {
  console.log('hello world!')
})

AccountRouter.post('/login', (req, res) => {
  console.log('hello world!')
})

AccountRouter.post('/logout', (req, res) => {
  console.log('hello world!')
})

export default AccountRouter
