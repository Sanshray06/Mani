import express from 'express'
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controller/orderController.js'
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router()


orderRouter.post('/list', adminAuth , allOrders)
orderRouter.post('/status', adminAuth,updateStatus)

orderRouter.post('/place' , authUser, placeOrder)
orderRouter.post('/razorpay' , authUser, placeOrderRazorpay)
orderRouter.post('/stripe' , authUser, placeOrderStripe)

orderRouter.post('/userorders',  authUser , userOrders)

export default orderRouter