import express from "express"
import {authCheck} from "../middleware/verifyToken.js";
import { checkApiKey, verifyToken } from "../middleware/auth.js";
import { checkId, createOrder, getOrders, orderStatus, upiGateway, wallet } from "../controller/order.js";
import { ppGateway, ppOrderStatus, test } from "../controller/pporders.js";

const router = express.Router();

router.post("/neworder",checkApiKey,verifyToken,createOrder)

//For Gateway
router.post("/createOrder",checkApiKey,verifyToken,upiGateway)
router.post("/orderstatus",verifyToken,orderStatus);

//FOR PHONEPE
// router.post("/createOrder",checkApiKey,verifyToken,ppGateway)
// router.post("/orderstatus",verifyToken,ppOrderStatus);


router.post("/createWalletOrder",checkApiKey,verifyToken,wallet)

router.post("/checkid",checkId)

router.get("/:userId",getOrders)

// router.post("/test",test)


export default router;