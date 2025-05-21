import { signup, signin, getProfile, updateProfile } from '../services/userServices.js';
import { jwt } from 'hono/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export const signupController = async (c) => {
  try {
    const userData = await c.req.json();
    const user = await signup(userData);
    return c.json(user, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};

export const signinController = async (c) => {
  try {
    const { email, password } = await c.req.json();
    const user = await signin(email, password);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return c.json({ user, token });
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
};

export const getProfileController = async (c) => {
  try {
    const userId = c.req.param('id') || c.get('user')._id;
    const user = await getProfile(userId);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json(user);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};

export const updateProfileController = async (c) => {
  try {
    const userData = await c.req.json();
    const userId = c.req.param('id') || c.get('user')._id;
    
    const user = await updateProfile(userId, userData);
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json(user);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
};