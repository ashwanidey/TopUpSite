import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../mailer.js";


export const register = async (req, res) => {
  try {
    const { name,mobilenumber,email, password} = req.body;
    const users = await User.find({})

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      mobilenumber,
      email,
      password: passwordHash,
      userid : Number(users[users.length-1].userid) + 1
      
    });
    
    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

    sendEmail(email,"Verification",`https://topupsite.netlify.app/verification/${savedUser._id}/${token}`)
    
    res.status(201).json(savedUser);
  } catch (err) {
    // res.json(res.body)
    res.status(500).json({ error: err.message });
  }
};

export const verifyMail = async(req,res) => {
  try {
    const {id, token} = req.params

    const verified = jwt.verify(token,process.env.JWT_SECRET)

    const userId = verified.id;
    if(userId != id){
      return res.status(400).json({msg:`The link is corrupted.`,code:"1"})
    }
    const newUser = await User.findByIdAndUpdate({_id: id}, {verified: true})

    res.status(200).json({msg: "Email Verified",code:"0"});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });


    if (user.verified === "false"){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

      sendEmail(email,"Verification",`https://topupsite.netlify.app/verification/${user._id}/${token}`)

      return res.status(400).json({ msg: "You are not verified. Sending verification mail" }
    );
    } 
  

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
