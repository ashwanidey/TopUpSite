import { sendEmail } from "../mailer.js";
import Order from "../models/Orders.js";
import User from "../models/User.js";


function generateUniqueId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `${timestamp}-${randomNum}`; // Combine them to form the unique ID
}



export const createOrder = async (req,res) => {
   try{
    const {itemname,status,userid,input1,input2,paymentmode,value} = req.body;

    const newOrder = new Order({
      itemname,status,userid,input1,input2,paymentmode,value
    })

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

   }catch(err){
    res.status(500).json({error : err.message}); 
   }
}

export const upiGateway = async(req,res) => {
  try{
    const {itemname,status,userid,input1,input2,paymentmode,value} = req.body;
    const number = parseFloat(value)
    const uniqueId = generateUniqueId();
    const userInfo = await User.find({_id:userid})
    const user = userInfo[0]
    console.log(user.name);

    const response = await fetch(`https://api.ekqr.in/api/create_order`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "key": process.env.API_KEY,
        "client_txn_id": uniqueId,
        "amount": number.toFixed(2),
        "p_info": "test",
        "customer_name": user.name,
        "customer_email": user.email,
        "customer_mobile": user.mobilenumber,
        "redirect_url": "https://topupsite.netlify.app/confirmation"
        
      })
    })

    const data = await response.json();

    const newOrder = new Order({
      itemname,status,userid,input1,input2,paymentmode,value,transactionid: uniqueId
    })

    const savedOrder = await newOrder.save();

    const newData = {
      ...data,
      order : savedOrder
    }

    
    res.status(200).json(newData);
  }
  catch(err){
    res.status(500).json({error : err.message});
  }
}

export const orderStatus = async (req, res) => {
  try {
    const {client_txn_id,date} = req.body;
    
    

    const response = await fetch(`https://api.ekqr.in/api/check_order_status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "key": process.env.API_KEY,
        "client_txn_id": client_txn_id,
        "txn_date": date
      })
    });

    const data = await response.json();
    
    if(data.status && data.data.status === "success"){
      await Order.findOneAndUpdate({transactionid:client_txn_id},{status:"Processing"})
      sendEmail(data.data.customer_email,`Order Successful`,"Order Details")
    }
    else if(data.status && data.data.status === "failure"){
      await Order.findOneAndUpdate({transactionid:client_txn_id},{status:"Failed"})
      sendEmail(data.data.customer_email,`Order Failed`,"Order Details")
    }

    const updatedOrder = await Order.findOne({transactionid : client_txn_id})

    const newData = {
      ...data,
      order : updatedOrder
    }

    res.status(200).json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrders = async(req,res) =>{
  try{
    const {userId} = req.params;
    const orders = await Order.find({userid:userId});
    res.status(200).json(orders);
  }
  catch(e){
    res.status(500).json({error : err.message});
  }
}


