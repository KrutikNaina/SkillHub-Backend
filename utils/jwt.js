import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, googleId: user.googleId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
