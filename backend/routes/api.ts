import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'

const ApiRouter = express.Router()

ApiRouter.get('/questions', (req, res) => {
  console.log('hello world!')
  res.send('hello world!')
})

ApiRouter.post('/questions/add', isAuthenticated, (req, res) => {
  console.log('hello world!')
})

ApiRouter.post('/questions/answer', isAuthenticated, (req, res) => {
  console.log('hello world!')
})

export default ApiRouter
