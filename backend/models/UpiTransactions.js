import mongoose from "mongoose";

const merchantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  upi_id: {
    type: String,
    required: true,
  },
});

const upiTransactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  client_txn_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_mobile: {
    type: String,
    required: true,
  },
  p_info: {
    type: String,
    required: true,
  },
  upi_txn_id: {
    type: String,
   default : "",
  },
  status: {
    type: String,
    enum: ["success", "failure", "pending"],
    required: true,
  },
  customer_vpa: {
    type: String,
    default: "",
  },
  udf1: {
    type: String,
    default: "",
  },
  udf2: {
    type: String,
    default: "",
  },
  udf3: {
    type: String,
    default: "",
  },
  txnAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Merchant: {
    type: merchantSchema,
    required: true,
  },
});

const UpiTransaction = mongoose.model("UpiTransaction", upiTransactionSchema);
export default UpiTransaction;
