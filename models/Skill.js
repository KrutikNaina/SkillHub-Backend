// models/Skill.js

import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
        },
        title: {
            type: String, required: true
        },
        coverImage: {
            type: String
        },
        startDate: Date,
        targetGoal: String, // e.g., "100-hour goal"
        description: String,
    },
    { timestamps: true }
)

export default mongoose.model('Skill', skillSchema)
