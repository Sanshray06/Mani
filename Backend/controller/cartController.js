import userModel from '../models/userModel.js'; // Adjust the path to your model

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 1;
    }

    cartData[itemId][size] += 1; // Increment the item quantity for the specified size
    userData.cartData = cartData;

    await userModel.findByIdAndUpdate(userId , {cartData})
    res.status(200).json({ message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;


    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(400).json({ message: "Item or size not found in cart" });
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId,{cartData})

    res.status(200).json({ message: "Cart updated successfully", cartData });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Cart fetched successfully",
      cartData: userData.cartData || {}
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
