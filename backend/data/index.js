import mongoose from "mongoose";

const ProductIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

// const ItemsIds = [
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
//   new mongoose.Types.ObjectId(),
// ]

export const products = [
  {
    _id: ProductIds[0],
    name: "Mobile Legends",
    type: "games",
    productid: 13,
    isTrending : "true",
    imgPath: "",
    inputs: [{label : "Player ID"},{label : "Zone ID"}],
    items : [],
    __v: 0,
  },
  
  
]

export const items = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "BGMI - 60 UC",
    itemid : 1,
    productid: ProductIds[0],
    originalprice: 100,
    discountedprice : 99,
    imgpath : "",
  },
]




