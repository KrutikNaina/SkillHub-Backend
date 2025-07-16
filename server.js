// server.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('🎉 SkillHub Backend is Running!');
  });  

connectDB()

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
