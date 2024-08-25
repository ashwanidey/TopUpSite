import User from "../models/User.js";
import { sendOtp } from "../sendOtp.js";
import jwt from "jsonwebtoken";

export const checkMobileNumber = async (req, res) => {
  try {
    const {mobile} = req.body;
    const user = await User.findOne({ mobilenumber: mobile  });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Mobile Number not registered with us",
      });
    }

    if(user.otpLastSent && user.otpLastSent > Date.now() - 120000){
      return res.status(201).send({
        success: false,
        message: "Otp Already Sent",
      });
    }
    const smsOTP = Math.floor(100000 + Math.random() * 900000);
    await sendOtp(smsOTP,  mobile);
    
    const savedOtpUser = await User.findOneAndUpdate(
      { mobilenumber: mobile },
      { $set: { mobileOtp: smsOTP }, otpExpiresAt: Date.now() + 300000 , otpLastSent: Date.now()},
     
      
      { new: true }
    );
    if (!savedOtpUser) {
      return res
        .status(201)
        .send({ success: false, message: "Error In saving Otp" });
    }
    return res.status(200).send({
      success: true,
      message: "Otp Sent Successfully",
      
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Check Mobile Number Ctrl ${error.message}`,
    });
  }
};


export const verifyMobileController = async (req, res) => {
  
  try {
    const {mobile,otp} = req.body;
    const userExist = await User.findOne({ mobilenumber: mobile});
    if (!userExist) {
      return res
        .status(200)
        .send({ success: false, message: "User Not Found" });
    }

    if (userExist.mobileOtp !== otp) {
      return res.status(200).send({ success: false, message: "Incorrect OTP" });
    } else {
      const updateUser = await User.findOneAndUpdate(
        { mobilenumber: mobile },
        { $set: { verified: "true" } },
        { new: true }
      );
      const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
      if (!updateUser) {
        return res
          .status(200)
          .send({ success: false, message: "Failed to Verify" });
      }
      return res.status(202).send({
        success: true,
        message: "Verified Successfully",
        token : token,
        user : updateUser
        
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: `Verify Mobile Ctrl ${error.message}`});
}
};


export const timer = async (req, res) => {
  try {
    const {mobile} = req.body;
    const user = await User.findOne({ mobilenumber: mobile });
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Mobile Number not registered with us",
      });
    }
   

  // console.log(Date.now())
      return res.status(201).send({
        success: true,
        timer: new Date(user.otpLastSent ).getTime() - Date.now() + 120000,
      });
    
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Timer Ctrl ${error.message}`,
    });
  }
}

