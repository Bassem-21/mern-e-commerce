import express from 'express';
import { ViewProduct } from '../models/ViewProduct.js';
import { Product } from '../models/Product.js';

const router = express.Router();

router.post('/find-view-product-id', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        let viewProduct = await ViewProduct.findOne({ user: userId, product: productId });

        if (!viewProduct) {
            viewProduct = new ViewProduct({
                user: userId,
                product: productId,
                view_product: 1,
            });
            await viewProduct.save();

            await Product.findByIdAndUpdate(
                productId,
                { $inc: { view_Product: 1 } },
                { new: true }
            );

            res.status(201).json({
                errors: null,
                message: 'First time viewing product. View count incremented.',
                data: viewProduct,
            });
        } else {
            return res.status(200).json({
                errors: null,
                message: 'User has already viewed this product.',
                data: viewProduct,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            errors: [err.message],
            message: 'Something went wrong!',
            data: null,
        });
    }
});

const ViewProductController = router
export default ViewProductController;