import {model, Schema} from 'mongoose'
import argon from 'argon2'

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        enum: ["user", "admin", "super admin"],
        default: "user",
    }
}, {timestamps: true});

// hash the password befpre saving
UserSchema.pre('save', async function (next)
{
    if (this.isModified('password'))
    {
        this.password = await argon.hash(this.password);
    }
    next();
});

export const User = model('User', UserSchema);