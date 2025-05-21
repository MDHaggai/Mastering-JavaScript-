import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticate = async (c, next) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Authorization header missing ' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ _id: decoded.userId });
    
    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }
    
    c.set('user', user);
    c.set('token', token);
    
    return await next();
  } catch (error) {
    return c.json({ error: 'Please authenticate' }, 401);
  }
};