import axios from 'axios'
import { Question } from './types'

// USER

export interface GetUserResponse {
  username: string
}

export const getUser = () => axios.get<GetUserResponse>('/account/me')

export const signup = (username: string, password: string) =>
  axios.post('/account/signup', { username, password })

export const login = (username: string, password: string) =>
  axios.post('/account/login', { username, password })

export const logout = () => axios.post('/account/logout')

// QUESTIONS

export interface GetQuestionsResponse {
  questions: Question[]
}

export const getQuestions = () =>
  axios.get<GetQuestionsResponse>('/api/questions')
