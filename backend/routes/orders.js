import express from "express"
import {authCheck} from "../middleware/verifyToken.js";
import { createOrder, getOrders } from "../controller/order.js";

const router = express.Router();

router.post("/neworder",authCheck,createOrder)

router.get("/:userId",getOrders)


export default router;