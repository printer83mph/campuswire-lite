import { Handler } from 'express'

const isAuthenticated: Handler = (req, res, next) => {
  // @ts-ignore
  if (req.session.user) {
    return next()
  }
  res.status(401)
  throw new Error('Must be logged in!')
}

export const isNotAuthenticated: Handler = (req, res, next) => {
  // @ts-ignore
  if (!req.session.user) {
    return next()
  }
  res.status(401)
  throw new Error('You are logged in!')
}

export default isAuthenticated
