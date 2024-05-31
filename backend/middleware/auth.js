import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const isAdmin = async(req,res,next) => {
  try{
   
    const userId  = req.userId;
    const user = await User.find({_id:userId})
    
    if(user[0].role === "admin"){
      next();
    }
    else{
      res.status(403).send("You are not an admin")
    }
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}