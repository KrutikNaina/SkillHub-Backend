import ProgressLog from '../models/ProgressLog.model.js'

// Create a new progress log
export const createProgressLog = async (req, res) => {
  try {
    const { userId, skillId, content, mediaUrl } = req.body

    const newLog = new ProgressLog({
      userId,
      skillId,
      content,
      mediaUrl
    })

    await newLog.save()
    res.status(201).json(newLog)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create log', error: err.message })
  }
}

// Get all logs for a specific skill
export const getLogsBySkill = async (req, res) => {
  try {
    const { skillId } = req.params

    const logs = await ProgressLog.find({ skillId })
      .populate('userId', 'displayName avatar')
      .sort({ createdAt: -1 })

    res.status(200).json(logs)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message })
  }
}

// Optional: Get all logs by a user
export const getLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params

    const logs = await ProgressLog.find({ userId })
      .populate('skillId', 'title')
      .sort({ createdAt: -1 })

    res.status(200).json(logs)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user logs', error: err.message })
  }
}
