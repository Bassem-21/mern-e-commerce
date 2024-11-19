import express from 'express';
import { Review } from '../models/Review.js';

const router = express.Router();

router.post('/find-review-id', async (req, res) => {
    const comment = req.body;
    
    try{
        const review = await Review.findOne( comment );
        if(review){
            res.status(200).json({
                errors: null,
                message: 'Review found!',
                data: review
            });
        }
        else{
            res.status(404).json({
                errors: null,
                message: 'Review not found!',
                data: null
            });
        }
    }
    catch(err){
        console.error("ERROR: " + err.message);
    }
})

router.post('/create', async (req, res) => {
    const { user,rating,product,comment } = req.body;

    try {
        const review = new Review({
          user,
          product,
          comment,
          rating
        });

        await review.save();

        res.status(201).json({
            errors: null,
            message: 'Review created successfully!',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
            message: 'Failed to create Review',
            data: null
        });
    }
});

router.put('/update', async (req, res) => {
    const {id , rating, product, user,comment} = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['Review ID is required'],
            message: 'Failed to update Review',
            data: null
        });
    }
    if(!id && !comment && !product && !user && !rating){
        return res.status(400).json({
            errors: ['All fields are required'],
            message: 'Failed to update Review',
            data: null
        });
    }
    try {
        const review = await Review.findByIdAndUpdate(
        id,
        {comment,rating, product, user},
        { new: true });

        res.status(200).json({
            errors: null,
            message: 'Review was updated successfully!',
            data: review
        });
    }
    catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'Review not found',
            data: null
        })
    }
})

router.delete('/delete', async (req,res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['Review ID is required'],
            message: 'Failed to delete Review',
            data: null
        });
    }

    try{
        const review = await Review.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                errors: ['Review not found'],
                message: 'Failed to delete Review',
                data: null
            });
        }
        
        res.status(200).json({
            errors: null,
            message: 'Review deleted successfully!',
            data: null
        });
    }catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'Review not found',
            data: null
        });
    }
});

const ReviewController = router
export default ReviewController;