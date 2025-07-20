import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  email: String,
  avatar: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
