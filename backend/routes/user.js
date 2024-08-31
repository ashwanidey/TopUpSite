import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { myOrders, editProfile } from "../controller/user.js";


const router = express.Router();

router.get("/myorder/:userid",myOrders)
router.post("/edit-profile",editProfile)

export default router;