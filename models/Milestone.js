// models/Milestone.js

import mongoose from 'mongoose'

const milestoneSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        skillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        },
        type: {
            type: String
        }, // e.g., '7-day streak', '30% completed'
        badge: {
            type: String
        }, // e.g., 'Consistency King'
        achievedOn: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
)

export default mongoose.model('Milestone', milestoneSchema)
