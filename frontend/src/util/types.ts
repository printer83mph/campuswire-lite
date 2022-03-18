export interface Identifiable {
  _id: string
}

export interface Question extends Identifiable {
  questionText: string
  author: string
  answer?: string
}
