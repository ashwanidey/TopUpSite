import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getTransactions, getWalletBalance, ppTopUp, ppTxnStatus, topUp, txnStatus } from "../controller/wallet.js";


const router = express.Router();

// UPI gateway
// router.post("/topup",verifyToken,topUp)
// router.post("/txnstatus",verifyToken,txnStatus);

// PhonePay
router.post("/topup",verifyToken,ppTopUp)
router.post("/txnstatus",verifyToken,ppTxnStatus);



router.get("/getbalance/:userid",verifyToken,getWalletBalance);
router.get("/gettransactions/:userid",verifyToken,getTransactions);


export default router;