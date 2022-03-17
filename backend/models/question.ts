import mongoose, { Schema } from 'mongoose'

export interface QuestionSchema {
  questionText: string
  answer: string
  author: string
}

const questionSchema = new Schema<QuestionSchema>({
  questionText: { type: String, required: true, trim: true },
  answer: { type: String, trim: true },
  author: { type: String, required: true, trim: true },
})

const Question = mongoose.model('Question', questionSchema)

export default Question
