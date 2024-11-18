import express from 'express';
import { Cart } from '../models/Cart.js';

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

router.put('/update', async (req, res) => {
    const {id, products, quantity, user } = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['cart ID is required'],
            message: 'Failed to update cart',
            data: null
        });
    }
    if(!quantity && !user && !products){
        return res.status(400).json({
            errors: ['All fields are required'],
            message: 'Failed to update cart',
            data: null
        });
    }
    try {
        const cart = await Cart.findByIdAndUpdate(
        id,
        { products, quantity, user},
        { new: true });

        res.status(200).json({
            errors: null,
            message: 'cart was updated successfully!',
            data: cart
        });
    }
    catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'cart not found',
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