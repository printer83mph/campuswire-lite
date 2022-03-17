import { Schema } from 'mongoose'

export interface Question {
  questionText: string
  answer: string
  author: string
}

const Question = new Schema<Question>({
  questionText: { type: String, required: true },
  answer: String,
  author: { type: String, required: true },
})

export default Question
