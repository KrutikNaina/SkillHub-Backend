// models/ProgressLog.js

import mongoose from 'mongoose'

const progressLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        skillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill', required: true
        },
        content: {
            type: String,
            required: true
        }, // Markdown text

        mediaUrl: {
            type: String
        }, // Optional image or video
        date: {
            type: Date, default: Date.now
        },
    },
    { timestamps: true }
)

export default mongoose.model('ProgressLog', progressLogSchema)
