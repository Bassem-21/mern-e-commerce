import express from 'express';
import { Like } from '../models/Like.js';
import authMiddleware from '../middleware/auth-middleware.js';
const router = express.Router();

router.post('/find-like-id', async (req, res) => {
    const {id} = req.body;

    try{
        const likes = await Like.findOne( {id} );
        if(likes){
            res.status(200).json({
                errors: null,
                message: 'Like found!',
                data: product
            });
        }
        else{
            res.status(404).json({
                errors: null,
                message: 'Like not found!',
                data: null
            });
        }
    }
    catch(err){
        console.error("ERROR: " + err.message);
    }
})
router.post('/create',authMiddleware, async (req, res) => {
    try {
        const { productId, userId } = req.body;
        if (!productId || !userId) {
            throw new Error('Missing required fields!');
        }

        const like = new Like({
            user: userId,
            product: productId
        })

        await like.save()

        res.status(200).json({
            errors: null,
            message: "Like created!",
            data: like
        })

    } catch (error) {
        res.status(500).json({
            errors: [error.message],
            message: "Something went wrong!",
            data: null
        })
    }
})

router.put('/update', async (req, res) => {
    const {id, like, user, product } = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['Like ID is required'],
            message: 'Failed to update Like',
            data: null
        });
    }
    if(!like && !user && !product){
        return res.status(400).json({
            errors: ['All fields are required'],
            message: 'Failed to update Like',
            data: null
        });
    }
    try {
        const likes = await Like.findByIdAndUpdate(
        id,
        { like, user , product},
        { new: true });

        res.status(200).json({
            errors: null,
            message: 'Like was updated successfully!',
            data: likes
        });
    }
    catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'Like not found',
            data: null
        })
    }
})

router.delete('/delete', async (req,res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['Like ID is required'],
            message: 'Failed to delete Like',
            data: null
        });
    }

    try{
        const likes = await Like.findByIdAndDelete(id);
        if(!likes){
            return res.status(404).json({
                errors: ['Like not found'],
                message: 'Failed to delete Like',
                data: null
            });
        }
        
        res.status(200).json({
            errors: null,
            message: 'Like deleted successfully!',
            data: null
        });
    }catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'Like not found',
            data: null
        });
    }
});

const LikeController = router
export default LikeController;