import mongoose from "mongoose";



const productSchema = mongoose.Schema(
  {
    name : {
      type:String,
      required:  true
    },
    type : {
      type:String,
      required:  true
    },
    productid : {
      type: Number,
      required:  true
    },
    imgpath : {
      type:String,
      default : "",
    },
    inputs : {
      type : Array,
      default : [],
    },
    items : {
      type : Array,
      default : [],
    }
  },
  { timestamps: true }
)

const Product = mongoose.model("Product",productSchema);
export default Product;