import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: 'Admin not found' });

    req.admin = admin; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
