import { Schema } from 'mongoose'

export interface User {
  username: string
  password: string
}

const User = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

export default User
