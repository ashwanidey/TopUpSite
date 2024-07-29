import mongoose from "mongoose";

const walletSchema = mongoose.Schema(
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
   
    
  },
  { timestamps: true
  }
)

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;