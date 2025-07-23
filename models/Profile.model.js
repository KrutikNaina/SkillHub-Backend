import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: String,
  bio: String,
  avatar: String,
  github: String,
  linkedin: String,
  twitter: String,
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
