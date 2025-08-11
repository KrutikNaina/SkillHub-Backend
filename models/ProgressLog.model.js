import mongoose from 'mongoose'

const progressLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: false },
  skillTitle: { type: String, required: true }, // easier for display without join
  date: { type: Date, required: true },
  notes: { type: String, required: true },
  completionPercent: { type: Number, required: true, min: 0, max: 100 },
  image: { type: String }, // optional if you want
  video: { type: String }, // optional
}, { timestamps: true })

export default mongoose.models.ProgressLog || mongoose.model('ProgressLog', progressLogSchema)
