import express from 'express'
import expressAsyncHandler from 'express-async-handler'

import isAuthenticated from '../middlewares/isAuthenticated'
import Question from '../models/question'

const ApiRouter = express.Router()

ApiRouter.get('/questions', async (req, res, next) => {
  const questions = await Question.find().catch(next)
  res.json({ questions })
})

ApiRouter.post(
  '/questions/add',
  isAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const { questionText } = req.body
    // @ts-ignore
    const { user } = req.session
    const post = new Question({ author: user, questionText })
    await post.save()
    res
      .status(200)
      .json({ message: 'Successfully posted question!', _id: post._id })
  })
)

ApiRouter.post(
  '/questions/answer',
  isAuthenticated,
  expressAsyncHandler(async (req, res) => {
    const { _id, answer } = req.body
    const post = await Question.findOne({ _id }).catch(() => {
      res.status(400)
      throw new Error('Post not found!')
    })
    await post?.update({ answer })
    res.status(200).json({ message: 'Successfully posted answer!' })
  })
)

export default ApiRouter
