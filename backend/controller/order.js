import { sendEmail } from "../mailer.js";
import Order from "../models/Orders.js";
import User from "../models/User.js";
import CryptoJS from "crypto-js";

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

export const upiGateway = async (req, res) => {
  try {
    const {
      itemname,
      status,
      userid,
      input1,
      input2,
      paymentmode,
      value,
      productid,
      itemid
    } = req.body;
    const number = parseFloat(value);
    const uniqueId = generateUniqueId();
    const userInfo = await User.find({ _id: userid });
    const user = userInfo[0];
    console.log(user.name);

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
        redirect_url: "https://topupsite.netlify.app/confirmation",
      }),
    });

    const data = await response.json();

    const newOrder = new Order({
      orderid : uniqueId,
      itemname,
      productid,
      itemid,
      status,
      userid,
      input1,
      input2,
      paymentmode,
      value,
      transactionid: uniqueId,
    });

    const savedOrder = await newOrder.save();

    const newData = {
      ...data,
      order: savedOrder,
    };

    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const orderStatus = async (req, res) => {
  try {
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
    const order = await Order.findOne({ transactionid: client_txn_id });

    if (data.status && data.data.status === "success") {


      if (order.productid === "662bc6b94d4d7c73c57ba046") {
       
        let email = process.env.API_EMAIL;
        let uid = process.env.API_UID;
        let userid = order.input1;
        let zoneid = order.input2;
        let product = "mobilelegends";
        let productid = order.itemid;
        let time = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
        

        let m_key = process.env.API_MKEY; // Assuming m_key is an empty string as provided

        
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

        // console.log(sign); // Output the generated sign
        try{
          const response = await fetch(
            "https://www.smile.one/smilecoin/api/createorder",
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
          
          if(data.message === "success"){
            await Order.findOneAndUpdate(
              { transactionid: client_txn_id },
              { status: "Completed" }
            );
          }
          else{
            await Order.findOneAndUpdate(
              { transactionid: client_txn_id },
              { status: "Processing" }
            );
            sendEmail("ashwanidey2904@gmail.com","Order Not Completed",`Reason : ${data.message}`);
          }
         console.log(data)
        }
        catch(err){
          console.log({ error: err.message });
        }
        
      } else {
        
        await Order.findOneAndUpdate(
          { transactionid: client_txn_id },
          { status: "Processing" }
        );
      }
      sendEmail(data.data.customer_email, `Order Successful`, "Order Details");
    } else if (data.status && data.data.status === "failure") {
      await Order.findOneAndUpdate(
        { transactionid: client_txn_id },
        { status: "Failed" }
      );
      sendEmail(data.data.customer_email, `Order Failed`, "Order Details");
    }

    const updatedOrder = await Order.findOne({ transactionid: client_txn_id });

    const newData = {
      ...data,
      order: updatedOrder,
    };

    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userid: userId });
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
    let productid = "13"; // Assuming productid remains "13" as per previous code
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
      "https://www.smile.one/smilecoin/api/getrole",
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
