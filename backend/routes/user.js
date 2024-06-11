import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { myOrders } from "../controller/user.js";


const router = express.Router();

router.get("/myorder/:userid",myOrders)

export default router;