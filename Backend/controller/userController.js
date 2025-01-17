import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false ,message:"User doesn't Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token  = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(error){
        console.log(error);
        res.json({
            success:false , message:error.message
        })
    }
};

const registerUser = async (req, res) => {
    try{
        const {name , email , password} = req.body;
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false , message:"User Already Exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({
            success:false , message:error.message
        })
    }
};



const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify email and password against environment variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Invalid admin credentials.",
      });
    }

    // Generate a token for the admin
    const token = jwt.sign(email+password,process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      message: "Admin logged in successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { loginUser, registerUser, adminLogin };



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Njc4OTU0MzJjMDFiOGM1NDcyOWQzMiIsImlhdCI6MTczNDgzODYxM30.YjXdnOm-wZf2wB9YqO--TR8l950EvxUDcfRSCMr0RK8