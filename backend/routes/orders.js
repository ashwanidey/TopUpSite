import express from "express"
import {authCheck} from "../middleware/verifyToken.js";
import { createOrder } from "../controller/order.js";

const router = express.Router();

router.post("/neworder",authCheck,createOrder)


export default router;