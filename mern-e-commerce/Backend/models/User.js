import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});


export const User = mongoose.model('User', UserSchema);