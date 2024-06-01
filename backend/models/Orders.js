import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
  itemname :{
    type : String,
    required: true,
  },
  status :{
    type : String,
    required: true,
  },
  transactionid : {
    type : String,
    required : true,
    unique: true,
  },
  userid : {
    type : String,
    required : true,
  },
  input1 :{
    type : String,
    default : "",
  },
  input2 :{
    type : String,
    default : "",
  },
  value :{
    type : String,
    required: true,
  },
  paymentmode :{
    type : String,
    required: true,
  },
  reason :{
    type : String,
    default : "",
  },
},
{ timestamps: true })

const Order = mongoose.model("Order",orderSchema);
export default Order;