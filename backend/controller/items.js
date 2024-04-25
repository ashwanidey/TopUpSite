import Items from "../models/Items.js";
import Product from "../models/Products.js";


export const getItems = async(req,res) => {
  try{
      const {productId} = req.params;
      const items = await Items.find({productid : productId});

      res.status(200).json(items);

      

  }catch(err){
    res.status(500).send({error : err.message});
  }
}