import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false, // ✅ make optional
  },
  githubId: {
    type: String,
    required: false, // ✅ new field for GitHub
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // GitHub sometimes doesn't return email
    unique: true,
    sparse: true, // ✅ allow multiple nulls
  },
  avatar: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
