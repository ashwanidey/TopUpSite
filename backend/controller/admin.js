import Order from "../models/Orders.js"

export const getProcessingOrders = async(req,res) =>{
  try{
    const processingOrders = await Order.find({status : "Processing"});
    res.status(200).send(processingOrders)
  }catch(err){
    res.status(500).send({error: err.message})
  }
}

export const updateOrder = async(req,res) => {
  try{
    const {orderId,status1,reason1} = req.params;
   

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {status : status1,reason : reason1},
      
    )
    res.status(200).send(updatedOrder)
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}