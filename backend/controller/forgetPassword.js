import { sendEmail } from "../mailer.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const forgetPassword = async(req,res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email:email});
    if(!user) return res.status(400).json({msg:"User does not exist."});
    
    //send email to user with link to reset password
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    sendEmail(user.email,"Reset Password",
      `
      Dear user,\n
      We received a request to reset your password for your Miraki Store account.\m
      Please click below to reset your password\n\n
      https://topupsite.netlify.app/reset_password/${user._id}/${token}\n\n
      
      If you did not request a password reset, please ignore this email. Your password will remain unchanged.\n\n
      Best Regards,\n
      Miraki Store\n
      `);

    res.status(200).json({msg:"Email sent, please check your inbox."});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const resetPassword = async(req,res) => {
  try {
    const {id, token} = req.params
    const {password} = req.body

    const verified = jwt.verify(token,process.env.JWT_SECRET)

    const userId = verified.id;
    if(userId != id){
      return res.status(400).json({msg:`The link is corrupted.`,code:"1"})
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.findByIdAndUpdate({_id: id}, {password: passwordHash})

    res.status(500).json({msg: "Password changed successfully.",code:"0"});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}