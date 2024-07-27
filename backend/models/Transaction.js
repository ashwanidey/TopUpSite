import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    txnid :{
      type: String,
      required: true
    },
    walletid : {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    useremail : {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Created",
    },
  },
  { timestamps: true }
)

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;