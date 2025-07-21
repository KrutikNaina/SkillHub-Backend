import Profile from '../models/Profile.model.js';

export const createProfile = async (req, res) => {
  try {
    const { userId, fullName, bio, avatar, github, linkedin, twitter } = req.body;

    const profile = new Profile({
      userId,
      fullName,
      bio,
      avatar,
      github,
      linkedin,
      twitter
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully!', profile });
  } catch (err) {
    console.error('Profile creation failed:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
