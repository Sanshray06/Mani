import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        // Log incoming request
        console.log('Received order request:', req.body);
        
        const { userId, items, totalAmount, shippingAddress, paymentMethod, paymentStatus, isBuyNow } = req.body;

        // Validate required fields
        if (!userId || !items || !totalAmount || !shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                missingFields: {
                    userId: !userId,
                    items: !items,
                    totalAmount: !totalAmount,
                    shippingAddress: !shippingAddress
                }
            });
        }

        // Validate shipping address fields
        const requiredAddressFields = [
            'firstName', 'lastName', 'email', 'street',
            'city', 'state', 'zipcode', 'country', 'phone'
        ];
        
        const missingAddressFields = requiredAddressFields.filter(
            field => !shippingAddress[field]
        );

        if (missingAddressFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Missing shipping address fields",
                missingFields: missingAddressFields
            });
        }

        const newOrder = new orderModel({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod: paymentMethod || 'cod',
            paymentStatus: paymentStatus || false,
            isBuyNow: isBuyNow || false,
            status: 'Order Placed'
        });

        // Log order before saving
        console.log('Attempting to save order:', newOrder);
        
        await newOrder.save();
        if(!isBuyNow){
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
        }
        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error('Order placement error:', {
            message: error.message,
            stack: error.stack
        });
        
        return res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }
};

const placeOrderStripe = async (req,res) =>{
    
}



const placeOrderRazorpay = async (req,res) =>{
    
}


const allOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        console.log('Fetching orders for userId:', userId); // Log the userId

        // Use `populate` on `userId` to get the user's `name` and `email` from the User model
        const orders = await orderModel
            .find({ userId })
            .populate({
                path: 'userId',
                select: 'name email', // Select only the name and email fields from the User model
            });
            console.log(orders);
        return res.status(200).json(orders);
        
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
}



const userOrders = async (req,res) =>{
    
}



const updateStatus = async (req,res) =>{
    
}



export {allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe ,updateStatus , userOrders}
