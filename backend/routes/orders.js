import express from "express"
import {authCheck} from "../middleware/verifyToken.js";
import { verifyToken } from "../middleware/auth.js";
import { createOrder, getOrders } from "../controller/order.js";

const router = express.Router();

router.post("/neworder",verifyToken,createOrder)

router.get("/:userId",getOrders)


export default router;