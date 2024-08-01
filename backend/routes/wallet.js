import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getTransactions, getWalletBalance, ppTopUp, topUp, txnStatus } from "../controller/wallet.js";


const router = express.Router();

// UPI gateway
// router.post("/topup",verifyToken,topUp)

// PhonePay
router.post("/topup",verifyToken,ppTopUp)


router.post("/txnstatus",verifyToken,txnStatus);
router.get("/getbalance/:userid",verifyToken,getWalletBalance);
router.get("/gettransactions/:userid",verifyToken,getTransactions);


export default router;