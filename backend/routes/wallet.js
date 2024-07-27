import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { topUp, txnStatus } from "../controller/wallet.js";


const router = express.Router();

router.post("/topup",verifyToken,topUp)
router.post("/txnstatus",verifyToken,txnStatus);


export default router;