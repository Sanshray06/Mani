import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      type,
      sizes,
      bestSeller,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !originalPrice || !category || !type) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Extract uploaded files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url; // Return the secure URL of the uploaded image
      })
    );

    // Ensure at least 2 images for Mainimage
    if (imagesUrl.length < 2) {
      return res.status(400).json({
        message: "At least 2 images are required for the Mainimage.",
      });
    }

    // Save product in the database
    const product = new productModel({
      name,
      description,
      price: Number(price),
      originalPrice: Number(originalPrice),
      images: imagesUrl, // All uploaded images
      Mainimage: imagesUrl.slice(0, 2), // First 2 images as Mainimage
      category,
      type,
      sizes: sizes ? JSON.parse(sizes) : [], // Parse sizes if provided
      bestSeller: bestSeller === "true", // Convert bestSeller to boolean
      date: Date.now(),
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};


const listProducts = async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await productModel.find();
  
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found." });
      }
  
      res.status(200).json({ message: "Products retrieved successfully!", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  
  const removeProducts = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Check if the product exists
      const product = await productModel.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      // Delete the product
      await productModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  
  const singleProduct = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Fetch the product by ID
      const product = await productModel.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      res.status(200).json({ message: "Product retrieved successfully!", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
export {addProduct,singleProduct,listProducts,removeProducts}