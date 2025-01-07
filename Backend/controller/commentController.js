import commentModel from "../models/commentModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose"; // or require('mongoose') if you're using CommonJS

const addComment = async (req, res) => {
    try {
        const { productId, userId, comment, rating } = req.body;
        console.log("Request body:", req.body);

        // Ensure that the product exists
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const product = await productModel.findById(productObjectId);
        console.log("ProductId from request:", productId);
        console.log("Converted ObjectId:", productObjectId);
        console.log("Product search result:", product);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Create a new comment with the product name
        const newComment = new commentModel({
            productId: productObjectId, 
            userId,
            comment,
            rating,
            productName: product.name // Storing the product name
        });

        await newComment.save();

        return res.status(201).json({ message: "Comment added successfully", newComment });
    } catch (error) {
        console.error("Error details:", error);  // Log the error
        return res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
};



const getComments = async (req, res) => {
    try {
        const { productId } = req.params;

        const comments = await commentModel.find({ productId }).populate("userId", "name email", null, { strictPopulate: false }); // Optionally populate user data
        
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch comments", error });
    }
};



export { getComments,addComment };