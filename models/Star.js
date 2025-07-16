// models/Star.js

import mongoose from 'mongoose'

const starSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        skillId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
            required: true
        },
    },
    { timestamps: true }
)

export default mongoose.model('Star', starSchema)
