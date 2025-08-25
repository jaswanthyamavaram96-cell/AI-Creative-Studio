import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: '' },
  },
  { timestamps: true }
)

UserSchema.methods.comparePassword = async function (passwordPlain) {
  return bcrypt.compare(passwordPlain, this.passwordHash)
}

UserSchema.statics.hashPassword = async function (passwordPlain) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(passwordPlain, salt)
}

export default mongoose.models.User || mongoose.model('User', UserSchema)

