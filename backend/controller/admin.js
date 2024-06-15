import { sendEmail } from "../mailer.js";
import Items from "../models/Items.js";
import Order from "../models/Orders.js"
import User from "../models/User.js";

export const getProcessingOrders = async(req,res) =>{
  try{
    const processingOrders = await Order.find({status : "Processing"});
    processingOrders.reverse()
    res.status(200).send(processingOrders)
  }catch(err){
    res.status(500).send({error: err.message})
  }
}

export const getUsersData = async(req,res) => {
  try{
    const usersData = await User.find();
    usersData.reverse()
    res.status(200).send(usersData)
  }catch(err){
    res.status(500).send({error: err.message})
  }

}

export const deleteUser = async(req,res) => {
  try{
    const {email} = req.params;
    const user = await User.findOne({email:email});
    if(!user) return res.status(404).send({msg:"User not found"})
    await User.findByIdAndDelete(user._id)
    res.status(200).send({msg:"User deleted successfully"})
  }catch(err){
    res.status(500).send({error: err.message})
  }

}

export const updateOrder = async(req,res) => {
  try{
    const {orderId,status1,reason1} = req.params;
    const order = await Order.findOne({_id : orderId})
   

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {status : status1,reason : reason1},
      
    )
    if(status1 === "Completed"){
      sendEmail(order.customer_email,`Order ${order.orderid} completed succesfully`,`Order Number : ${order.orderid}\n\nOrder Date : ${order.date}\n\nProduct Name : ${order.product_name}\n\nItem : ${order.itemname}\n\nUserId : ${order.input1}\n\nServerId : ${order.input2}\n\nPrice : ₹${order.value}\n\nUPI transaction id : ${order.upi_txn_id}\n\nCustomer VPA : ${order.customer_vpa}`)
    }
    else if(status1 === "Refunded"){
      
      try{
      sendEmail(order.customer_email,`Your order cannot be completed!`,`We regret to inform you that your order could not be completed.\n\nReson : ${reason1}\n\nWe will initiate a refund amount to your source account. The amount will reflect in your account within 24 hours.\n\nOrder Number : ${order.orderid}\n\nOrder Date : ${order.date}\n\nProduct Name : ${order.product_name}\n\nItem : ${order.itemname}\n\nUserId : ${order.input1}\n\nServerId : ${order.input2}\n\nPrice : ₹${order.value}\n\nUPI transaction id : ${order.upi_txn_id}\n\nCustomer VPA : ${order.customer_vpa}\n\nThank you for purchasing from Miraki Store.\n\nIf you have any issues related to the order, kindly contact customer service via Live Chat. Our Live Chat is located at the bottom right of our website.\n\nBest Regards,\n\nMiraki Store`)
      }
      catch(err){
        console.log(err.message)
      }
        
      
    }
    
    
    res.status(200).send(updatedOrder)
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}

export const updatePrice = async(req,res) => {
  try{
    const {itemId,price} = req.params;

    const updatedOrder = await Items.findByIdAndUpdate(
      itemId,
      {discountedprice : price}
    )
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}


export const allTxn = async(req,res) => {
  try{
    const allTxn = await Order.find();
    allTxn.reverse()
    res.status(200).send(allTxn)
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}

export const stats = async(req,res) => {
  try{
    const allTxn = await Order.find();
    let processing=0;
    let completed=0;
    let refunded=0;
    let totalSale=0;
    for(let i =0;i<allTxn.length;i++){
      if(allTxn[i].status === "Processing"){
        processing++;
      }
      else if(allTxn[i].status === "Completed"){
        completed++;
        totalSale += Number(allTxn[i].value);
      }
      else if(allTxn[i].status === "Refunded"){
        refunded++;
      }
      
    }
    const result = {"processing" : processing,
      "completed" : completed,
      "refunded" : refunded,
      "total_sale" : totalSale,
      "total_order" : allTxn.length
    }

    res.status(200).json(result);
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}