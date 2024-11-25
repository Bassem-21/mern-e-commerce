import express from 'express';
import { Cart } from '../models/Cart.js';
import authMiddleware from '../middleware/auth-middleware.js';

const router = express.Router();

router.post('/find-cart-id', async (req, res) => {
    const  id  = req.body;

    try{
        const cart = await Cart.findOne(  id  );
        if(cart){
            res.status(200).json({
                errors: null,
                message: 'Cart found!',
                data: cart
            });
        }
        else{
            res.status(404).json({
                errors: null,
                message: 'Cart not found!',
                data: null
            });
        }
    }
    catch(err){
        console.error("ERROR: " + err.message);
    }
})
router.post('/create', async (req, res) => {
    const { quantity, user , products } = req.body;

    try {
        const cart = new Cart({
            quantity, 
            products,
            user 
        });

        await cart.save();

        res.status(201).json({
            errors: null,
            message: 'cart created successfully!',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
            message: 'Failed to create cart',
            data: null
        });
    }
});

router.put('/update', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id
        const newCart = {
            user: userId,
            products: []
        }

        Object.entries(req.body.cart).forEach((cartItem) => {
            newCart.products.push( {
                product: cartItem[0],
                quantity: cartItem[1]
            })

        })

        // update cart if exists,
        // otherwise, create it with the passed contents
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            newCart,
            { upsert: true, new: true }
        )

        res.status(200).json({
            errors: null,
            message: "Product updated!",
            data: cart
        })

    } catch (error) {
        res.status(500).json({
            errors: [error.message],
            message: "Something went wrong!",
            data: null
        })
    }
})
router.delete('/delete', async (req,res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['cart ID is required'],
            message: 'Failed to delete cart',
            data: null
        });
    }

    try{
        const cart = await Cart.findByIdAndDelete(id);
        if(!cart){
            return res.status(404).json({
                errors: ['cart not found'],
                message: 'Failed to delete cart',
                data: null
            });
        }
        
        res.status(200).json({
            errors: null,
            message: 'cart deleted successfully!',
            data: null
        });
    }catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'cart not found',
            data: null
        });
    }
});

const CartController = router
export default CartController;