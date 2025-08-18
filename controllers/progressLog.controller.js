import ProgressLog from '../models/ProgressLog.model.js'

// Get all progress logs for the logged-in user, sorted by date desc
export const getUserProgressLogs = async (req, res) => {
  try {
    const userId = req.user._id

    const logs = await ProgressLog.find({ userId }).sort({ date: -1 })
    res.status(200).json(logs)
  } catch (error) {
    console.error('Error fetching user progress logs:', error)
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
    console.error('Error creating progress log:', error)
    res.status(500).json({ message: 'Failed to create progress log', error: error.message })
  }
}

// Get count of progress logs for the logged-in user
export const getProgressLogsCount = async (req, res) => {
  try {
    const userId = req.user._id
    const count = await ProgressLog.countDocuments({ userId })
    res.status(200).json({ count })
  } catch (error) {
    console.error('Error fetching progress logs count:', error)
    res.status(500).json({ message: 'Failed to fetch progress logs count', error: error.message })
  }
}
