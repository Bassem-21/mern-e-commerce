import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

export const Like = mongoose.model('Like', LikeSchema);