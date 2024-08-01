import Items from "../models/Items.js";
import User from "../models/User.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import Product from "../models/Products.js";
import Order from "../models/Orders.js";

function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
}



export const ppGateway = async (req, res) => {
  try {
    const { userid, input1, input2, paymentmode, itemid } = req.body;
    const userInformation = await User.findById(userid);
    const item = await Items.findOne({ itemid: itemid });
    const product = await Product.findById(item.productid);
    const productid = product.productid;
    const dbproductid = item.productid;
    const transactionId = generateUniqueId();
    const status = "Created";
    const itemidarray = item.itemidarray;

    let value;
    if (userInformation.role === "reseller") {
      value = item.resellprice;
    } else {
      value = item.discountedprice;
    }

    const price = parseInt(value);

    //Paypal API Order Creation

    const name = userInformation.name;
    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID" + userInformation.userid,

      amount: price * 100,
      redirectUrl: `https://senofficial.in/confirmation?client_txn_id=${transactionId}`,
      redirectMode: "POST",
      mobileNumber: userInformation.mobilenumber,
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

    const newOrder = new Order({
      orderid: transactionId,
      itemname : item.name,
      productid,
      dbproductid,
      useremail: userInformation.email,
      productname: product.name,
      itemid,
      status,
      userid,
      input1,
      input2,
      paymentmode,
      value,
      transactionid: transactionId,
      itemidarray,
    });

    const savedOrder = await newOrder.save();

    console.log(ppResData)

    res.status(200).json(response.data.data.instrumentResponse.redirectInfo)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const test = async (req, res) => {
  try {
     const {transactionId} = req.body
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
    res.status(200).json(response.data);
        


  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
