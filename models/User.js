// models/User.js

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: { 
      type: String, required: true, unique: true 
    },
    avatar: {
      type:String
    },
    provider: {
       type: String, default: 'google' 
      }, // for Google auth
    providerId: { 
      type: String, required: true 
    },   // Google user ID (sub)
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
