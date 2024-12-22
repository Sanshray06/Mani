import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    images: { type: Array, required: true },
    Mainimage: {
        type: Array,
        required: true,
        validate: {
            validator: (value) => value.length >= 2,
            message: "Mainimage must have at least 2 images.",
        },
    },
    category: { type: String, required: true },
    type: { type: String, required: true },
    sizes: { type: Array },
    bestSeller: { type: Boolean },
    date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;

// id: 1,
// name: "Classic Necklace Set",
// price: 1200,
// originalPrice:2500,
// currency: '₹',
// description: "Elegant necklace set with matching earrings.",
// mainImage: [Product1, mainProduct1_1],
// images: [
// mainProduct1_1,
// mainProduct1_2,
// mainProduct1_3,
// mainProduct1_4,
// ],
// category: "Women",
// type: "Necklace",
// inStock: true,
// bestseller: true,