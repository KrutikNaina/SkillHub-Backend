// import jwt from 'jsonwebtoken'
// import User from '../models/User.js'

// export const handleGoogleLogin = async (req, res) => {
//   const { name, email, avatar } = req.body
//   if (!email) return res.status(400).json({ error: 'Email is required' })

//   let user = await User.findOne({ email })
//   if (!user) {
//     user = await User.create({ name, email, avatar })
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   })

//   res.json({ token, user })
// }

// export const handleGithubLogin = async (req, res) => {
//   const { name, email, avatar } = req.body
//   if (!email) return res.status(400).json({ error: 'Email is required' })

//   let user = await User.findOne({ email })
//   if (!user) {
//     user = await User.create({ name, email, avatar })
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   })

//   res.json({ token, user })
// }
