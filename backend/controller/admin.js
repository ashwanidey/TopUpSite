import { sendEmail } from "../mailer.js";
import Items from "../models/Items.js";
import Order from "../models/Orders.js";
import Point from "../models/Points.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import Product from "../models/Products.js"

function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
}

export const getProcessingOrders = async (req, res) => {
  try {
    const processingOrders = await Order.find({ status: "Processing" });
    processingOrders.reverse();
    res.status(200).send(processingOrders);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getUsersData = async (req, res) => {
  try {
    const usersData = await User.find();
    usersData.reverse();
    res.status(200).send(usersData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ msg: "User not found" });
    await User.findByIdAndDelete(user._id);
    res.status(200).send({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const editUserRole = async (req, res) => {
  try {
    const { email } = req.params;
    const { role } = req.query;

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Update user's role
    // console.log(role);
    user.role = role;
    // console.log(user.role)
    await user.save();
    // console.log(user.role)
    // Save updated user
    // const updatedUser = await user.save();
    res.status(200).send({ msg: "updated successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderId, status1, reason1 } = req.params;
    const order = await Order.findOne({ _id: orderId });

    const userInformation = await User.findOne({ _id: order.userid });
    const wallet = await Wallet.findOne({ dbuserid: order.userid });

    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
      status: status1,
      reason: reason1,
    });
    console.log(status1 === "Completed")
    if(status1 === "Completed"){
      console.log("in")
      try{
      const points = await Point.findOne({ dbuserid: order.userid });
      let newBalance = points.balance;
      newBalance += order.value / process.env.POINTS_RATIO;

      
      const transaction = {
        type: "credit",
        amount: order.value,
      };
      const updatedPoint = await Point.findOneAndUpdate(
        { dbuserid: order.userid },
        { balance: newBalance, $push: { transactions: transaction } },
        { new: true }
      );
      console.log(updatedPoint);
    }catch(err){
      console.log(err.message)
    }
    }
    if (status1 === "Completed") {
     
      sendEmail(
        order.customer_email,
        `Your order ${order.orderid} has been completed succesfully`,
        `Order Number : ${order.orderid}\n\n
        Order Date : ${order.date}\n\n
        Product Name : ${order.product_name}\n\n
        Item : ${order.itemname}\n\n
        UserId : ${order.input1}\n\n
        ServerId : ${order.input2}\n\n
        Price : ₹${order.value}\n\n
        UPI transaction id : ${order.upi_txn_id}\n\n
        
        Thank you for purchasing from Gammerce.in.\n\n
        
        If you have any issues related to the order, kindly contact customer service via Live Chat. Our Live Chat is located at the bottom right of our website.\n\n
        Best Regards,\n\n
        Gammerce.in`
      );
      // Customer VPA : ${order.customer_vpa}
    } else if (status1 === "Refunded") {
      const transactionId = generateUniqueId();

      const transaction = new Transaction({
        txnid: transactionId,
        userid: userInformation.userid,
        useremail: userInformation.email,
        amount: order.value,
        type: "Refunded",
        status: "Success",
        walletid: wallet._id,
      });

      await transaction.save();
      // console.log(order.value)
      wallet.balance += parseInt(order.value);
      await wallet.save();

      try {
        sendEmail(
          order.customer_email,
          `Your order cannot be completed!`,
          `We regret to inform you that your order could not be completed.\n\n
        Reson : ${reason1}\n\n
        We will initiate a refund amount to your source account. The amount will reflect in your account within 24 hours.\n\n
        Order Number : ${order.orderid}\n\n
        Order Date : ${order.date}\n\n
        Product Name : ${order.product_name}\n\n
        Item : ${order.itemname}\n\n
        UserId : ${order.input1}\n\n
        ServerId : ${order.input2}\n\n
        Price : ₹${order.value}\n\n
        UPI transaction id : ${order.upi_txn_id}\n\n
        Customer VPA : ${order.customer_vpa}\n\n
        
        Thank you for purchasing from Gammerce.in\n\n
        
        If you have any issues related to the order, kindly contact customer service via Live Chat. Our Live Chat is located at the bottom right of our website.\n\n
        Best Regards,\n\n
        Gammerce.in`
        );
      } catch (err) {
        console.log(err.message);
      }
    }

    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// export const updatePrice = async(req,res) => {
//   try{
//     const {itemId,price} = req.params;

//     const updatedOrder = await Items.findByIdAndUpdate(
//       itemId,
//       {discountedprice : price}
//     )
//   }
//   catch(err){
//     res.status(500).send({error: err.message})
//   }
// }

export const updatePrice = async (req, res) => {
  try {
    const { itemId, price, resellPrice } = req.params;

    const updatedItem = await Items.findByIdAndUpdate(itemId, {
      discountedprice: price,
      resellprice: resellPrice,
    });
    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const allTxn = async (req, res) => {
  try {
    const allTxn = await Order.find();
    allTxn.reverse();
    res.status(200).send(allTxn);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const stats = async (req, res) => {
  try {
    const allTxn = await Order.find();
    let processing = 0;
    let completed = 0;
    let refunded = 0;
    let totalSale = 0;
    for (let i = 0; i < allTxn.length; i++) {
      if (allTxn[i].status === "Processing") {
        processing++;
      } else if (allTxn[i].status === "Completed") {
        completed++;
        totalSale += Number(allTxn[i].value);
      } else if (allTxn[i].status === "Refunded") {
        refunded++;
      }
    }
    const result = {
      processing: processing,
      completed: completed,
      refunded: refunded,
      total_sale: totalSale,
      total_order: allTxn.length,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { productId, instock } = req.body;

    // Validate the input
    if (!productId || instock === undefined) {
      return res.status(400).send({ error: 'Missing parameters' });
    }

    // Update the instock field in the Product collection
    const updatedProduct = await Product.findByIdAndUpdate(productId, { instock }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
