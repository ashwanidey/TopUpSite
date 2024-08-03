import Items from "../models/Items.js";
import User from "../models/User.js";
import axios from "axios";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import Product from "../models/Products.js";
import Order from "../models/Orders.js";
import { sendEmail } from "../mailer.js";

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

      // redirectUrl: `https://senofficial.in/confirmation?client_txn_id=${transactionId}`,
      redirectUrl : `${process.env.REDIRECT_DOMAIN}/confirmation?client_txn_id=${transactionId}`,


      redirectMode: "REDIRECT",
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

    // console.log(ppResData)

    res.status(200).json(response.data.data.instrumentResponse.redirectInfo)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const ppOrderStatus = async (req, res) => {
  try{

    const { client_txn_id} = req.body;

    const merchantId = process.env.MERCHANT_ID

    
    const string = `/pg/v1/status/${merchantId}/${client_txn_id}` + process.env.SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + process.env.SALT_INDEX;

    const options = {
        method: 'GET',
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${client_txn_id}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT TATUS
    const response = await axios.request(options);
    const data = response.data;


    const order = await Order.findOne({ transactionid: client_txn_id });
    const product = await Product.findOne({ productid: order.productid });
    const itemidarray = order.itemidarray;


    if (
      (
      data.code &&
      data.code === "PAYMENT_SUCCESS" &&
      order.status === "Created"
      ) || (order.paymentmode === "wallet" && order.status === "Created")
    ) {
      let allGood;

      if (
        product.productid === 100 ||
        (product.productid === 112 && order.status === "Created")
      ) {
        await Order.findOneAndUpdate(
          { transactionid: client_txn_id },
          { status: "Processing" }
        );

        for (let i = 0; i < itemidarray.length; i++) {
          let email = process.env.API_EMAIL;
          let uid = process.env.API_UID;
          let userid = order.input1;
          let zoneid = order.input2;
          let product1 = "mobilelegends";
          let productid1 = order.itemidarray[i];
          let time = Math.floor(Date.now() / 1000); // Unix timestamp in seconds

          let m_key = process.env.API_MKEY; // Assuming m_key is an empty string as provided

          let sign_obj = {
            email: email,
            uid: uid,
            userid: userid,
            zoneid: zoneid,
            product: product1,
            productid: productid1,
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

          // console.log(sign); // Output the generated sign
          let url;

          if (product.productid === 100) {
            url = "https://www.smile.one/smilecoin/api/createorder";
          } else {
            url = "https://www.smile.one/ph/smilecoin/api/createorder";
          }

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              uid: uid,
              userid: userid,
              zoneid: zoneid,
              product: product1,
              productid: productid1,
              time: time,
              sign: sign,
            }),
          });

          const data1 = await response.json();
          allGood = data1.message;
          if (data1.message !== "success") break;
        }

        // console.log(data)

        if (allGood === "success") {
          await Order.findOneAndUpdate(
            { transactionid: client_txn_id },
            {
              status: "Completed",
              
             
              product_name: product.name,
              customer_email: data.data.customer_email,
            }
          );
          sendEmail(
            order.useremail,
            `Your order ${client_txn_id}  has been completed successfully`,
            `Order Number : ${client_txn_id}\n\n

              Product Name : ${product.name}\n\n
              Item : ${order.itemname}\n\n
              UserId : ${order.input1}\n\n
              ServerId : ${order.input2}\n\n
              Price : ₹${order.value}\n\n
              
              
              Thank you for purchasing from Miraki Store.\n\n
              
              If you have any issues related to the order, kindly contact customer service via Live Chat. Our Live Chat is located at the bottom right of our website.\n\n
              Best Regards,\n\n
              Miraki Store`
          );
          // Customer VPA : ${data.data.customer_vpa}
        } else {
          await Order.findOneAndUpdate(
            { transactionid: client_txn_id },
            {
              status: "Processing",
              // customer_vpa: data.data.customer_vpa,
              // upi_txn_id: data.data.upi_txn_id,
              // date: date,
              product_name: product.name,
              customer_email: order.useremail,
            }
          );
          // sendEmail(data.data.customer_email,``)
          sendEmail(
            process.env.EMAIL,
            `Miraki - New Order Received!`,
            `Order Number : ${client_txn_id}\n\n
              
              Product Name : ${product.name}\n\n
              Item : ${order.itemname}\n\n
              UserId : ${order.input1}\n\n
              ServerId : ${order.input2}\n\n
              Price : ₹${order.value}\n\n
              `
          );
        }
      } else {
        await Order.findOneAndUpdate(
          { transactionid: client_txn_id },
          {
            status: "Processing",
            
            product_name: product.name,
            customer_email: order.useremail,
          }
        );
        sendEmail(
          process.env.EMAIL,
          `Miraki - New Order Received!`,
          `Order Number : ${client_txn_id}\n\n
          Product Name : ${product.name}\n\n
          Item : ${order.itemname}\n\n
          UserId : ${order.input1}\n\n
          ServerId : ${order.input2}\n\n
          Price : ₹${order.value}\n\n
          `
        );
      }
    } else if (data.code && (data.code === "PAYMENT_DECLINED" || data.code === "PAYMENT_ERROR" )) {
      await Order.findOneAndUpdate(
        { transactionid: client_txn_id },
        { status: "Failed" }
      );
      // sendEmail(data.data.customer_email, `Order Failed`, "Order Details");
    }

    const updatedOrder = await Order.findOne({ transactionid: client_txn_id });

    const newData = {
      ...data,
      order: updatedOrder,
    };

    res.status(200).json(newData);

  }
  catch(err){
    res.status(200).json({error : err.message});
  }
}

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
