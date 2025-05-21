import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const signup = async(userData) => {
    // Hash password before saving
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    const user = new User(userData);
    return await user.save();
};

export const signin = async(email, password) => {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        throw new Error('Invalid email or password');
    }
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
    }
    
    return user;
};

export const getProfile = async(userId) => {
    return await User.findById(userId).select('-password');
};

export const updateProfile = async(userId, userData) => {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
    }
    return await User.findByIdAndUpdate(userId, userData, { new: true }).select('-password');
};
