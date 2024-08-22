import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPointBalance, redeemPoints } from "../controller/points.js";

const router = express.Router();


router.get("/getbalance/:userid",verifyToken,getPointBalance);

router.post("/redeempoints",verifyToken,redeemPoints);

export default router;