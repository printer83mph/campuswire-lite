import { Handler } from 'express'

const isAuthenticated: Handler = (req, res, next) => {
  // @ts-ignore
  if (req.session.user !== null) {
    next()
  } else {
    res.status(401)
    throw new Error('Must be logged in!')
  }
}

export default isAuthenticated
