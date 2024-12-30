import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    productName: { type: String, required: true }, // Store the product name
}, { timestamps: true });


const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema);
export default commentModel;
