import { sendEmail } from "../mailer.js";
import Items from "../models/Items.js";
import Order from "../models/Orders.js";
import Products from "../models/Products.js";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import Wallet from "../models/Wallet.js";
import UpiTransaction from "../models/UpiTransactions.js";
import Transaction from "../models/Transaction.js";
import Point from "../models/Points.js";


function generateUniqueId() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
    return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
  }

  export const upiGateway = async (req, res) => {
    try {
      const { userid, input1, input2, paymentmode, itemid } = req.body;
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
  
      // console.log(item)
      // const value = item.discountedprice;
      // const value = item.resellprice;
      // console.log(value);
      const number = parseFloat(value);
      const uniqueId = generateUniqueId();
      const userInfo = await User.find({ _id: userid });
      const user = userInfo[0];
      const itemidarray = item.itemidarray;
  
      // console.log(item.discountedprice)
  
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
          // redirect_url: "https://senofficial.in/confirmation",
          redirect_url: `${process.env.REDIRECT_DOMAIN}/confirmation`,
        }),
      });
  
      const data = await response.json();
  
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

  export const ugOrderStatus = async (req, res) => {
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
      if(data.status){
        const newUpiTransaction = new UpiTransaction(data.data);
        await newUpiTransaction.save();
      }
      const order = await Order.findOne({ transactionid: client_txn_id });
      const product = await Products.findOne({ productid: order.productid });
      const itemidarray = order.itemidarray;
      const points = await Point.findOne({ dbuserid: order.userid });
      // console.log(product)
  
      if (
        (
        data.status &&
        data.data.status === "success" &&
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
                customer_vpa: data.data.customer_vpa,
                upi_txn_id: data.data.upi_txn_id,
                date: date,
                product_name: product.name,
                customer_email: data.data.customer_email,
              }
            );
            
            let newBalance = points.balance;
            newBalance += order.value / process.env.POINTS_RATIO;
            
            const transaction = {
              type : "credit",
              amount : order.value,
             
            }
  
            const updatedPoint = await Point.findOneAndUpdate({dbuserid: order.userid },{balance:newBalance, $push:{transactions:transaction}},{new:true});
  
            sendEmail(
              data.data.customer_email,
              `Your order ${data.data.client_txn_id}  has been completed successfully`,
              `Order Number : ${data.data.client_txn_id}\n\n
                Order Date : ${date}\n\n
                Product Name : ${product.name}\n\n
                Item : ${order.itemname}\n\n
                UserId : ${order.input1}\n\n
                ServerId : ${order.input2}\n\n
                Price : ₹${order.value}\n\n
                UPI transaction id : ${data.data.upi_txn_id}\n\n
                
                Thank you for purchasing from Gammerce.in\n\n
                
                If you have any issues related to the order, kindly contact customer service via Live Chat. Our Live Chat is located at the bottom right of our website.\n\n
                Best Regards,\n\n
                Gammerce.in`
            );
            // Customer VPA : ${data.data.customer_vpa}
          } else {
            await Order.findOneAndUpdate(
              { transactionid: client_txn_id },
              {
                status: "Processing",
                customer_vpa: data.data.customer_vpa,
                upi_txn_id: data.data.upi_txn_id,
                date: date,
                product_name: product.name,
                customer_email: data.data.customer_email,
              }
            );
            // sendEmail(data.data.customer_email,``)
            sendEmail(
              process.env.EMAIL,
              `Gammerce - New Order Received!`,
              `Order Number : ${data.data.client_txn_id}\n\n
                Order Date : ${date}\n\n
                Product Name : ${product.name}\n\n
                Item : ${order.itemname}\n\n
                UserId : ${order.input1}\n\n
                ServerId : ${order.input2}\n\n
                Price : ₹${order.value}\n\n
                UPI transaction id : ${data.data.upi_txn_id}\n\n
                Customer VPA : ${data.data.customer_vpa}`
            );
          }
        } else {
          await Order.findOneAndUpdate(
            { transactionid: client_txn_id },
            {
              status: "Processing",
              customer_vpa: data.data.customer_vpa,
              upi_txn_id: data.data.upi_txn_id,
              date: date,
              product_name: product.name,
              customer_email: data.data.customer_email,
            }
          );
          sendEmail(
            process.env.EMAIL,
            `Gammerce - New Order Received!`,
            `Order Number : ${data.data.client_txn_id}\n\n
            Order Date : ${date}\n\n
            Product Name : ${product.name}\n\n
            Item : ${order.itemname}\n\n
            UserId : ${order.input1}\n\n
            ServerId : ${order.input2}\n\n
            Price : ₹${order.value}\n\n
            UPI transaction id : ${data.data.upi_txn_id}\n\n
            Customer VPA : ${data.data.customer_vpa}`
          );
        }
      } else if (data.status && data.data.status === "failure") {
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };