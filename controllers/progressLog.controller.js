import ProgressLog from '../models/ProgressLog.model.js'

// Get all progress logs for the logged-in user, sorted by date desc
export const getUserProgressLogs = async (req, res) => {
  try {
    const userId = req.user._id
    const logs = await ProgressLog.find({ userId }).sort({ date: -1 })
    res.status(200).json(logs)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user progress logs', error: error.message })
  }
}

// Create new progress log
export const createProgressLog = async (req, res) => {
  try {
    const userId = req.user._id
    const { skillId, skillTitle, date, notes, completionPercent, image, video } = req.body

    if (!skillTitle || !date || !notes || completionPercent === undefined)
      return res.status(400).json({ message: 'Missing required fields' })

    const newLog = new ProgressLog({
      userId,
      skillId,
      skillTitle,
      date,
      notes,
      completionPercent,
      image,
      video,
    })

    await newLog.save()
    res.status(201).json(newLog)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create progress log', error: error.message })
  }
}

// Get count of progress logs
export const getProgressLogsCount = async (req, res) => {
  try {
    const userId = req.user._id
    const count = await ProgressLog.countDocuments({ userId })
    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress logs count', error: error.message })
  }
}

// Delete progress log
export const deleteProgressLog = async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params

    const log = await ProgressLog.findOneAndDelete({ _id: id, userId })
    if (!log) return res.status(404).json({ message: "Log not found or unauthorized" })

    res.status(200).json({ message: "Log deleted successfully", id })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete progress log", error: error.message })
  }
}

// ✅ Get a single log
export const getProgressLogById = async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params

    const log = await ProgressLog.findOne({ _id: id, userId })
    if (!log) return res.status(404).json({ message: "Log not found or unauthorized" })

    res.status(200).json(log)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress log", error: error.message })
  }
}

// ✅ Update progress log
export const updateProgressLog = async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params

    const updatedLog = await ProgressLog.findOneAndUpdate(
      { _id: id, userId },
      { ...req.body },
      { new: true }
    )

    if (!updatedLog) return res.status(404).json({ message: "Log not found or unauthorized" })

    res.status(200).json(updatedLog)
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress log", error: error.message })
  }
}
