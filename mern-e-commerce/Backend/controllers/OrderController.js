import express from 'express';
import { Order } from '../models/Order.js';

const router = express.Router();

router.post('/find-order-id', async (req, res) => {
    const  orderId  = req.body;

    try{
        const order = await Order.findOne(  orderId  );
        if(order){
            res.status(200).json({
                errors: null,
                message: 'Order found!',
                data: order
            });
        }
        else{
            res.status(404).json({
                errors: null,
                message: 'Order not found!',
                data: null
            });
        }
    }
    catch(err){
        console.error("ERROR: " + err.message);
    }
})

router.post('/create', async (req, res) => {
    const {products, user, address, totalPrice} = req.body;

    try {
        const order = new Order({
          products,
          user,
          address,
          totalPrice
        });

        await order.save();

        res.status(201).json({
            errors: null,
            message: 'order created successfully!',
            data: order
        });
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
            message: 'Failed to create order',
            data: null
        });
    }
});

router.put('/update', async (req, res) => {
    const {id , address, products, user,totalPrice} = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['order ID is required'],
            message: 'Failed to update order',
            data: null
        });
    }
    if(!id && !address && !products && !user && !totalPrice){
        return res.status(400).json({
            errors: ['All fields are required'],
            message: 'Failed to update order',
            data: null
        });
    }
    try {
        const order = await Order.findByIdAndUpdate(
        id,
        {address, products, totalPrice,user},
        { new: true });

        res.status(200).json({
            errors: null,
            message: 'order was updated successfully!',
            data: order
        });
    }
    catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'order not found',
            data: null
        })
    }
})

router.delete('/delete', async (req,res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).json({
            errors: ['order ID is required'],
            message: 'Failed to delete order',
            data: null
        });
    }

    try{
        const order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).json({
                errors: ['order not found'],
                message: 'Failed to delete order',
                data: null
            });
        }
        
        res.status(200).json({
            errors: null,
            message: 'Order deleted successfully!',
            data: order
        });
    }catch(err){
        res.status(404).json({
            errors: [err.message],
            message: 'Order not found',
            data: null
        });
    }
});

const OrderController = router
export default OrderController;