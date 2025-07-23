import Profile from '../models/Profile.model.js';
import User from '../models/User.js';

export const createProfile = async (req, res) => {
  try {
    const { userId, bio, github, linkedin, twitter } = req.body;

    // Check if the profile already exists
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists.' });
    }

    // Fetch user basic info from User schema
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create new profile using info from User + additional inputs
    const profile = new Profile({
      userId,
      fullName: user.displayName,
      bio: bio || '',
      avatar: user.avatar,
      github: github || '',
      linkedin: linkedin || '',
      twitter: twitter || '',
    });

    await profile.save();
    res.status(201).json({ message: 'Profile created successfully!', profile });
  } catch (err) {
    console.error('Profile creation failed:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
