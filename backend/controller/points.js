import Point from "../models/Points.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";


function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
}

export const getPointBalance = async(req,res) =>{
  try{
    const {userid} = req.params;
   
    const point = await Point.findOne({userid:userid});
    // console.log(wallet)
    res.status(200).json({"balance" : point.balance});
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
}

export const redeemPoints = async(req,res) => {
  try{
    const {userid,value} = req.body;
    const number = parseFloat(value);
    const point = await Point.findOne({userid : userid});

    if(point.balance < number){
      return res.status(400).json({msg: `Insufficient points, available points : ${point.balance}`});
    }
    if(number < process.env.MIN_REDEEM_POINTS){
      return res.status(400).json({msg: `Minimum balance to be reedemed : ${process.env.MIN_REDEEM_POINTS}`});
    }

    const newBalance = point.balance - number;

    const transaction = {
      type : "redeem",
      amount : number,
      date : Date.now()
     
    }

    const updatedPoint = await Point.findOneAndUpdate({userid:userid},{balance:newBalance, $push:{transactions:transaction}},{new:true});

   const wallet = await Wallet.findOne({userid:userid});

   wallet.balance += number;
   await wallet.save();

   const transactionId = generateUniqueId()

   const userInformation = await User.findOne({userid : userid});
   

    const walletTransaction = new Transaction({
      txnid :  transactionId,
      userid : userInformation.userid,
      useremail : userInformation.email,
      amount: number,
      type : "Credit",
      status : "Success",
      walletid : wallet._id,

    });

    await walletTransaction.save();

    res.status(200).json({msg : `Points Redeemed Successfully....Current Balance : ${updatedPoint.balance}`});
    
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
}