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
      // sendEmail(order.customer_email,`Order ${order.orderid} completed succesfully`,`Order Number : ${order.orderid}\n\nOrder Date : ${order.date}\n\nProduct Name : ${order.product_name}\n\nItem : ${order.itemname}\n\nUserId : ${order.input1}\n\nServerId : ${order.input2}\n\nPrice : ₹${order.value}\n\nUPI transaction id : ${order.upi_txn_id}\n\nCustomer VPA : ${order.customer_vpa}`)
      const emailBody = `
            <p>Your order ${order.orderid} has been completed.</p>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Order Number:</th>
                    <td>${order.orderid}</td>
                    <th>Order Date:</th>
                    <td>${order.date}</td>
                </tr>
                <tr>
                    <td colspan="4"><strong>Order Status:</strong> Completed</td>
                </tr>
                <tr>
                    <td colspan="4">
                        <strong>Product:</strong>
                        <ul>
                            <li>${order.product_name}</li>
                            <li><strong>Quantity:</strong> ${order.itemname}</li>
                            <li><strong>User ID:</strong> ${order.input1}</li>
                            <li><strong>Server ID:</strong> ${order.input2}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>Price:</th>
                    <td>₹${order.value}</td>
                    <th>Payment Method:</th>
                    <td>UPI</td>
                </tr>
                <tr>
                    <th>UPI Transaction ID:</th>
                    <td>${order.upi_txn_id}</td>
                    <th>Total:</th>
                    <td>₹${order.value}</td>
                </tr>
            </table>
            <p>Thank you for purchasing from Miraki Store.</p>
            <p>If you have any issues related to the order, kindly contact customer service via <a href="https://example.com/livechat">Live Chat</a>. Our Live Chat is located at the bottom right of our website. You may check your order status at <a href="https://example.com/orderpage">my order page</a>.</p>
            <p>Best Regards,<br>Miraki Store</p>
    `;

    sendEmail(order.customer_email, `Order ${order.orderid} completed successfully!`, emailBody);

    }
    else if(status1 === "Refunded"){
      
      try{
      // sendEmail(order.customer_email,`Your order cannot be completed!`,`We regret to inform you that your order could not be completed.\n\nReson : ${reason1}\n\nWe will initiate a refund amount to your source account. The amount will reflect in your account within 24 hours.\n\nOrder Number : ${order.orderid}\n\nOrder Date : ${order.date}\n\nProduct Name : ${order.product_name}\n\nItem : ${order.itemname}\n\nUserId : ${order.input1}\n\nServerId : ${order.input2}\n\nPrice : ₹${order.value}\n\nUPI transaction id : ${order.upi_txn_id}\n\nCustomer VPA : ${order.customer_vpa}\n\nThank you for purchasing from Miraki Store.\n\nIf you have any issues related to the order, kindly contact customer service via Live Chat. Our Live Chat is located at the bottom right of our website.\n\nBest Regards,\n\nMiraki Store`)
      const emailBody = `
          <p>We regret to inform you that your order could not be completed.</p>
          <p>Reason: ${reason1}</p>
          <table border="1" cellpadding="5" cellspacing="0">
              <tr>
                  <th>Order Number:</th>
                  <td>${order.orderid}</td>
                  <th>Order Date:</th>
                  <td>${order.date}</td>
              </tr>
              <tr>
                  <td colspan="4"><strong>Order Status:</strong> Not Completed</td>
              </tr>
              <tr>
                  <td colspan="4">
                      <strong>Product:</strong>
                      <ul>
                          <li>${order.product_name}</li>
                          <li><strong>Quantity:</strong> ${order.itemname}</li>
                          <li><strong>User ID:</strong> ${order.input1}</li>
                          <li><strong>Server ID:</strong> ${order.input2}</li>
                      </ul>
                  </td>
              </tr>
              <tr>
                  <th>Price:</th>
                  <td>₹${order.value}</td>
                  <th>Payment Method:</th>
                  <td>UPI</td>
              </tr>
              <tr>
                  <th>UPI Transaction ID:</th>
                  <td>${order.upi_txn_id}</td>
                  <th>Total:</th>
                  <td>₹${order.value}</td>
              </tr>
              <tr>
                  <th>Customer VPA:</th>
                  <td>${order.customer_vpa}</td>
                  <th>Refund Amount:</th>
                  <td>₹${order.value}</td>
              </tr>
          </table>
          <p>The refund amount will reflect in your account within 24 hours.</p>
          <p>Thank you for purchasing from Miraki Store.</p>
          <p>If you have any issues related to the order, kindly contact customer service via <a href="https://example.com/livechat">Live Chat</a>. Our Live Chat is located at the bottom right of our website. You may also contact us via email at support@example.com.</p>
          <p>Best Regards,<br>Miraki Store</p>
      </body>
      </html>
  `;
  
  sendEmail(order.customer_email, `Your order cannot be completed!`, emailBody);
  
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