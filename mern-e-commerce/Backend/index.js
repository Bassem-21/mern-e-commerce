import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import dotenv from 'dotenv';
import UserController from './controllers/UserController.js';
import ProductController from './controllers/ProductController.js';
import LikeController from './controllers/LikesController.js';
import CartController from './controllers/CartController.js';
import ReviewController from './controllers/ReviewController.js';
import OrderController from './controllers/OrderController.js';
import ViewProductController from './controllers/ViewProductController.js';


dotenv.config();
const PORT = process.env.PORT;

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);


app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(express.json());

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

const prefix = '/api';
const version = '/v1'
app.use(prefix + version + '/user', UserController)
app.use(prefix + version + '/product', ProductController)
app.use(prefix + version + '/cart', CartController)
app.use(prefix + version + '/like', LikeController)
app.use(prefix + version + '/review', ReviewController)
app.use(prefix + version + '/order', OrderController)
app.use(prefix + version + '/view-product',ViewProductController)

mongoose.connect(process.env.MONGO_URI || '', clientOptions)
    .then(() => console.log('MongoDB connected'))
    .then(app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((err) => console.error('Connection error:', err));

