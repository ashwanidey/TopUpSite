import Items from "../models/Items.js";


export const getItems = async(req,res) => {
  try{
      const {productId} = req.params;
      const items = await Items.find({productid : productId});

      function compare( a, b ) {
        if ( a.itemid < b.itemid  ){
          return -1;
        }
        if ( a.itemid  > b.itemid  ){
          return 1;
        }
        return 0;
      }
      items.sort(compare)

      res.status(200).json(items);

      

  }catch(err){
    res.status(500).send({error : err.message});
  }
}