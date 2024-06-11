import Order from "../models/Orders.js";


export const myOrders = async(req,res) => {
  try{
    const {userid} = req.params
    console.log(userid)
    const orders = await Order.find({userid:userid});
    let completed = 0;
    let refunded=0;
    for(let i = 0;i<orders.length;i++){
      if(orders[i].status === "Completed"){
        completed++;
      }
      else if(orders[i].status === "Refunded"){
        refunded++;
      }
    }
    res.status(200).json({"completed" : completed,"refunded" : refunded,"total_order" : orders.length})
  }
  catch(err){
    res.status(500).send({error: err.message})
  }
}