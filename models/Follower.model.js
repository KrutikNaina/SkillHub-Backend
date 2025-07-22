// models/Follower.js

import mongoose from 'mongoose'

const followerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }, // followed
        followerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }, // who follows
    },
    { timestamps: true }
)

export default mongoose.model('Follower', followerSchema)
