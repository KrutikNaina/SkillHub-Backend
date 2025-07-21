# 🧠 SkillHub Backend

SkillHub is the backend for the SkillHub platform — a digital portfolio and collaborative growth tracker where learners can showcase, log, and evolve their skills over time.

This repository includes the backend server built with **Node.js, Express, MongoDB**, and **Google OAuth** (no Firebase).

---

## 🚀 Features

- 🔐 Google Authentication using OAuth 2.0
- 🧑‍💻 User Profiles with Avatar, Bio, and Social Links
- 📁 Skill Repositories (like GitHub)
- 🌟 Star System for Projects
- 📋 Daily Progress Logs & Milestones
- 🛡️ Protected Routes with JWT

---

## 📦 Install & Run

# Clone the repo
git clone https://github.com/yourusername/skillhub-backend.git
cd skillhub-backend

# Install dependencies
npm install

# Start server
node server.js

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB + Mongoose
- **Authentication**: Google OAuth 2.0
- **Token Management**: JWT
- **Environment Vars**: dotenv

---

## 🔑 Environment Variables

Create a `.env` file in the root with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 👨‍💻 Author
Built with ❤️ by [Krutik Naina](https://krutiknaina.com/)
