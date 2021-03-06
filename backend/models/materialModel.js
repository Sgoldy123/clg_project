import mongoose from 'mongoose'
const materialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed,
      req: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    branch: {
      type: String,
      required: true,
    },
    sem: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Material = mongoose.model('Material', materialSchema)
export default Material
