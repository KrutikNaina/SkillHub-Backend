import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: String,
  bio: String,
  avatar: String, // base64 string or URL
  github: String,
  linkedin: String,
  twitter: String
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
