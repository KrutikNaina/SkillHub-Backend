import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  coverImage: String,
  startDate: String,
  targetGoal: String,
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
