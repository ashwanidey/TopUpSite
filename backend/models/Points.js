import mongoose from "mongoose";

const pointSchema = mongoose.Schema(
  { 
    dbuserid : {
      type: String,
      required: true
    },
    
    userid: {
      type: String,
      required: true,
    },
    useremail : {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions : {
      type: Array,
      default : []
    },
   
  },
  { timestamps: true
  }
)

const Point = mongoose.model("Point", pointSchema);
export default Point;