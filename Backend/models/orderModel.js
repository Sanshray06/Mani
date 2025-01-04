import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  status: { 
    type: String, 
    required: true, 
    default: 'Order Placed' 
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['stripe', 'razorpay', 'cod']
  },
  paymentStatus: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  isBuyNow: {
    type: Boolean,
    default: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const OrderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default OrderModel;