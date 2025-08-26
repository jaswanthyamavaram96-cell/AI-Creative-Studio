import mongoose from 'mongoose'

const CreationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    type: { type: String, enum: ['poster', 'video', 'song'], required: true },
    prompt: { type: String, default: '' },
    options: { type: Object, default: {} },
    outputUrl: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
)

export default mongoose.models.Creation || mongoose.model('Creation', CreationSchema)

