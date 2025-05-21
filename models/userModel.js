import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
         type: String, 
         required: true,
         trim: true 
        },
    lastName: {
         type: String, 
         required: true,
         trim: true 
        },
    email: {
         type: String, 
         required: true,
         unique: true,
         trim: true 
        },
    password: {
         type: String, 
         required: true,
         select: false 
        },
    phoneNumber: {
        type: String,
        required: true,
        default: null
    },

dateOfBirth: {
    type: Date,
    required: true,
},

age: {
    type: String,
    required: true,
},

status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
},

roles: {
    type: [String],
    enum: ['admin', 'user'],
    default: ['user']
},

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
export default User;