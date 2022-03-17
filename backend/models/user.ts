import mongoose, { Schema } from 'mongoose'

export interface UserSchema {
  username: string
  password: string
}

const userSchema = new Schema<UserSchema>({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
})

const User = mongoose.model('User', userSchema)

export default User
