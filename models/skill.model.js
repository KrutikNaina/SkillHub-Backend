import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link to User model
    required: true
  },
  title: String,
  description: String,
  coverImage: String,
  startDate: Date,
  targetGoal: String
}, { timestamps: true });

export default mongoose.models.Skill || mongoose.model("Skill", skillSchema);
