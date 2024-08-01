import express from "express"
import {authCheck} from "../middleware/verifyToken.js";
import { checkApiKey, verifyToken } from "../middleware/auth.js";
import { checkId, createOrder, getOrders, orderStatus, upiGateway, wallet } from "../controller/order.js";
import { ppGateway, test } from "../controller/pporders.js";

const router = express.Router();

router.post("/neworder",checkApiKey,verifyToken,createOrder)
router.post("/createOrder",checkApiKey,verifyToken,ppGateway)
router.post("/createWalletOrder",checkApiKey,verifyToken,wallet)
router.post("/orderstatus",checkApiKey,orderStatus)
router.post("/checkid",checkId)

router.get("/:userId",getOrders)

router.post("/test",test)


export default router;