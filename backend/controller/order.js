import Order from "../models/Orders.js";

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


