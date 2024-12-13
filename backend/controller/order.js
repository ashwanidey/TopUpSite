import Items from "../models/Items.js";
import Order from "../models/Orders.js";
import Products from "../models/Products.js";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
}

export const createOrder = async (req, res) => {
  try {
    const { itemname, status, userid, input1, input2, paymentmode, value } =
      req.body;

    const newOrder = new Order({
      itemname,
      status,
      userid,
      input1,
      input2,
      paymentmode,
      value,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const wallet = async (req, res) => {
  try {
    const { userid, input1, input2, paymentmode, itemid } = req.body;
    const wallet = await Wallet.findOne({ dbuserid: userid });
    // console.log(userid)
    const balance = parseInt(wallet.balance);
    const item = await Items.findOne({ itemid: itemid });
    const product = await Products.findById(item.productid);
    const productid = product.productid;
    const dbproductid = item.productid;
    const itemname = item.name;
    const status = "Created";

    // Fetch user information
    const userInformation = await User.findById(userid);
    // console.log(userInformation);
    if (!userInformation) {
      return res.status(404).json({ error: "User not found" });
    }
    // Determine the price based on user role
    let value;
    if (userInformation.role === "reseller") {
      // console.log(userInformation.role);
      value = item.resellprice;
      // console.log(value);
    } else {
      // console.log(userInformation.role);
      value = item.discountedprice;
      // console.log(value);
    }

    const number = parseFloat(value);
    const uniqueId = generateUniqueId();
    const itemidarray = item.itemidarray;

    if(balance < number){
      res.status(200).json({msg : "Not Enough Balance","redirect_url": `${process.env.REDIRECT_DOMAIN}/balanceerror`});
      return;
    }
   

    const newOrder = new Order({
      orderid: uniqueId,
      itemname,
      productid,
      dbproductid,
      useremail : userInformation.email,
      productname : product.name,
      itemid,
      status,
      userid,
      input1,
      input2,
      paymentmode,
      value,
      transactionid: uniqueId,
      itemidarray,
      
    });
    wallet.balance -= number;
    await wallet.save();

    const transactionId = generateUniqueId()

    const transaction = new Transaction({
      txnid :  transactionId,
      userid : userInformation.userid,
      useremail : userInformation.email,
      amount: value,
      type : "Debit",
      status : "Success",
      walletid : wallet._id,

    });

    await transaction.save();

    const savedOrder = await newOrder.save();
    // res.status(200).json({"redirect_url": `https://senofficial.in/confirmation?client_txn_id=${uniqueId}`});
    res.status(200).json({
      redirect_url: `${process.env.REDIRECT_DOMAIN}/confirmation?client_txn_id=${uniqueId}`
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userid: userId });
    orders.reverse();
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ error: err.message });
  }
};

export const checkId = async (req, res) => {
  try {
    const { userid, zoneid } = req.body;
    let email = process.env.API_EMAIL;
    let uid = process.env.API_UID;

    let product = "mobilelegends";
    let productid = "212"; // Assuming productid remains "13" as per previous code
    let time = Math.floor(Date.now() / 1000);
    // console.log(time + " ");

    let m_key = process.env.API_MKEY;

    // Create an object with the fields
    let sign_obj = {
      email: email,
      uid: uid,
      userid: userid,
      zoneid: zoneid,
      product: product,
      productid: productid,
      time: time,
    };

    // Sort the object by key
    let sorted_keys = Object.keys(sign_obj).sort();
    let sorted_sign_obj = {};
    sorted_keys.forEach((key) => {
      sorted_sign_obj[key] = sign_obj[key];
    });

    // Construct the string to be hashed
    let str = "";
    for (let key in sorted_sign_obj) {
      str += key + "=" + sorted_sign_obj[key] + "&";
    }

    // Generate the sign using double MD5 hashing
    function md5(string) {
      return CryptoJS.MD5(string).toString();
    }

    let sign = md5(md5(str + m_key));

    const response = await fetch(
      "https://www.smile.one/ph/smilecoin/api/getrole",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          uid: uid,
          userid: userid,
          zoneid: zoneid,
          product: product,
          productid: productid,
          time: time,
          sign: sign,
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);

    // console.log(sign); // Output the generated sign
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
