import user from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "User Data Missing",
      });
    }

    const existUser = await user.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const isAuth = await existUser.comparePassword(password);
    if (!isAuth) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);
    return res.status(200).json({
      message: "Login Successful",
      data: { email },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const registerController = async(req,res) => {
    try{
        const {email,password,firstName,lastName} = req.body;

        if(!email || !password || !firstName || !lastName){
            res.status(400).json({
                message : "User Data Missing"
            });
        }
        const User  = await user.findOne({email});
        if(User){
            res.status(501).json({
                message: "User Exist"
            })
        }
        const newUser = await new user({
            email,
            password,
            firstName,
            lastName
        })
        await newUser.save();

        const token = await jwt.sign(
            {email},
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        res.cookie("token", token);
        res.status(201).json({
            message : "Registered Successful", 
            data : {email,firstName,lastName},
            token
        })
    }catch(error){
        console.log(error);
    }
}

export const forgetPasswordController = async(req,res) => {
    try{
        const {email} = req.body;

        if(!email){
            res.status(400).res({
                message : "User Data Missing"
            })
        }

        const existUser = await user.findOne({email});
        if(!existUser){
            res.status(500).res({
                message: "User Not Found"
            })
        }

        const token = await existUser.generateResetToken();
        const resetLink = `${process.env.FRONTEND_URI}/reset-password/token=${token}`

        console.log(resetLink);

        res.status(200).json({
            message:"Reset link is send to your Email",
            resetLink
        })
    }catch(error){
        console.log(error)
    }
}

export const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const existUser = await user.findOne({email : decoded.email});
    if (!existUser) return res.status(404).json({ message: 'Invalid token' });

    existUser.password = newPassword;
    await existUser.save();

    return res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};