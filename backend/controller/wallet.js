import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import crypto from "crypto";
import axios from "axios";


function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
}


export const getWalletBalance = async(req,res) =>{
  try{
    const {userid} = req.params;
   
    const wallet = await Wallet.findOne({userid:userid});
    console.log(wallet)
    res.status(200).json({"balance" : wallet.balance});
  }
  catch(err){
    res.status(500).json({error: err.message});
  }
}

export const getTransactions = async(req,res) => {
  try{
    const {userid} = req.params;
    const transactions = await Transaction.find({userid:userid}); 
    transactions.reverse();
    res.status(200).json(transactions);
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

export const topUp = async(req,res) => {
  try{
    const {value,userid} = req.body;
    const number = parseFloat(value);
    const uniqueId = generateUniqueId();
    const userInfo = await User.find({ userid: userid });
    const user = userInfo[0];
    

    const wallet = await Wallet.findOne({userid : userid});


    const response = await fetch(`https://api.ekqr.in/api/create_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.API_KEY,
        client_txn_id: uniqueId,
        amount: number.toFixed(2),
        p_info: "test",
        customer_name: user.name,
        customer_email: user.email,
        customer_mobile: user.mobilenumber,
        redirect_url: "https://topupsite.netlify.app/walletconfirmation",
      }),
    });

    const data = await response.json();

    const transaction = new Transaction({
      txnid :  uniqueId,
      userid,
      useremail : user.email,
      amount: value,
      type : "Credit",
      walletid : wallet._id,

    });

    const savedTxn = await transaction.save();

    res.status(200).json(data);


    
  }catch(err){
    res.status(500).json({error: err.message});
  }
}


export const ppTopUp = async(req,res) => {
  try{
    const {value,userid} = req.body;
    const number = parseFloat(value);
    const transactionId = generateUniqueId();
    const userInfo = await User.find({ userid: userid });
    const user = userInfo[0];
    

    const wallet = await Wallet.findOne({userid : userid});

    // Gateway

    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID" + user.userid,

      amount: number * 100,
      redirectUrl: `https://topupsite.netlify.app/walletconfirmation?client_txn_id=${transactionId}`,
      redirectMode: "POST",
      mobileNumber: user.mobilenumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
   
    const string = payloadMain + "/pg/v1/pay" + process.env.SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + process.env.SALT_INDEX;

    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    // const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    let ppResData;

    const response = await axios.request(options);
    

    //   Order Creation

    const transaction = new Transaction({
      txnid :  transactionId,
      userid,
      useremail : user.email,
      amount: value,
      type : "Credit",
      walletid : wallet._id,

    });

    const savedTxn = await transaction.save();

    res.status(200).json(response.data.data.instrumentResponse.redirectInfo);


    
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

export const txnStatus = async(req,res) => {
  try{
    const { client_txn_id, date } = req.body;

    const response = await fetch(`https://api.ekqr.in/api/check_order_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: process.env.API_KEY,
        client_txn_id: client_txn_id,
        txn_date: date,
      }),
    });



    const data = await response.json();
    const txn = await Transaction.findOne({ txnid: client_txn_id });

    if (data.status && data.data.status === "success" && txn.status === "Created") {
      const wallet = await Wallet.findOne({ _id: txn.walletid });

      wallet.balance = wallet.balance + parseInt(txn.amount);
      await wallet.save();

      txn.status = "Success";
      await txn.save();
    }
    else if(data.status && data.data.status === "failure"){
      txn.status = "Failed";
      await txn.save();
    }

    const updatedTransaction = await Transaction.findOne({txnid:client_txn_id});

    res.status(200).json({
      txnid : client_txn_id,
      status : updatedTransaction.status,
      amount : updatedTransaction.amount
    });


  }
  catch(err){
    res.status(500).json({error: err});
  }
}


export const ppTxnStatus = async(req,res) => {
  try{
    const { client_txn_id} = req.body;

    
    const merchantId = process.env.MERCHANT_ID

    
    const string = `/pg/v1/status/${merchantId}/${transactionId}` + process.env.SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + process.env.SALT_INDEX;

    const options = {
        method: 'GET',
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT TATUS
    const response = await axios.request(options);
    


    const data = await response.json();
    const txn = await Transaction.findOne({ txnid: client_txn_id });

    if (data.code && data.code === "PAYMENT_SUCCESS" && txn.status === "Created") {
      const wallet = await Wallet.findOne({ _id: txn.walletid });

      wallet.balance = wallet.balance + parseInt(txn.amount);
      await wallet.save();

      txn.status = "Success";
      await txn.save();
    }
    else if(data.code && (data.code === "PAYMENT_DECLINED" || data.code === "PAYMENT_ERROR" )){
      txn.status = "Failed";
      await txn.save();
    }

    const updatedTransaction = await Transaction.findOne({txnid:client_txn_id});

    res.status(200).json({
      txnid : client_txn_id,
      status : updatedTransaction.status,
      amount : updatedTransaction.amount
    });


  }
  catch(err){
    res.status(500).json({error: err});
  }
}