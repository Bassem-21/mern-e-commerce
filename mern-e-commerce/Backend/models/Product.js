import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    pictures: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        enum: ['cars', 'gadgets', 'devices', 'shoes'],
        required: true
    },
    number_of_reviews: {
        type: Number,
        required: true,
        default: 0
    },
    sum_of_ratings: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});



export const Product = mongoose.model('Product', ProductSchema);