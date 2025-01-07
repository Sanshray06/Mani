import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controller/orderController.js'
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';
import productModel from '../models/productModel.js';

const orderRouter = express.Router()


orderRouter.post('/list', adminAuth , allOrders)
orderRouter.post('/status', adminAuth,updateStatus)

orderRouter.post('/place' , authUser,placeOrder)
orderRouter.post('/razorpay' , authUser, placeOrderRazorpay)
orderRouter.post('/stripe' , authUser, placeOrderStripe)
orderRouter.get('/allOrders/:userId',authUser , allOrders)
orderRouter.post('/userorders',  authUser , userOrders)

orderRouter.get('/item/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the item ID from the URL parameter
        const item = await productModel.findById(id); // Find item by _id using Mongoose
        console.log(id);
        console.log(item); 
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Extract the first image from the Mainimage array
        const firstImage = item.Mainimage && item.Mainimage.length > 0 ? item.Mainimage[0] : null;

        if (!firstImage) {
            return res.status(404).json({ error: 'No images available for this item' });
        }

        // Respond with the item's details, including the first image from the Mainimage array
        res.json({
            name: item.name,
            price: item.price,
            imageUrl: firstImage, // Return the first image from the array
        });
    } catch (error) {
        console.error('Error fetching item details:', error);
        res.status(500).json({ error: 'Failed to fetch item details' });
    }
});

export default orderRouter