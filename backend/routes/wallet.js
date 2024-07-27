import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getTransactions, getWalletBalance, topUp, txnStatus } from "../controller/wallet.js";


const router = express.Router();

router.post("/topup",verifyToken,topUp)
router.post("/txnstatus",verifyToken,txnStatus);
router.get("/getbalance/:userid",verifyToken,getWalletBalance);
router.get("/gettransactions/:userid",verifyToken,getTransactions);


export default router;