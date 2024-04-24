import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemid: {
    type: Number,
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  originalprice: {
    type: Number,
    required: true,
  },
  discountedprice: {
    type: Number,
    required: true,
  },
  imgpath: {
    type: String,
    default: "",
  },
});

const Items = mongoose.model("Items", itemsSchema);
export default Items;
