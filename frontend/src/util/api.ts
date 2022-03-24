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

export const getQuestion = (id: string) =>
  axios.get<{ question: Question }>(`/api/questions/${id}`)

export const getQuestions = () =>
  axios.get<GetQuestionsResponse>('/api/questions')

export const postQuestion = (questionText: string) =>
  axios.post('/api/questions/add', { questionText })

export const postAnswer = (id: string, answer: string) =>
  axios.post('/api/questions/answer', { _id: id, answer })
