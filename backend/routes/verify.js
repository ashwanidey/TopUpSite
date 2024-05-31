import express from "express";
import { email, mobileNumber } from "../controller/verify.js";

const router = express.Router();

router.post("/mobilenumber", mobileNumber);
router.post("/email", email);

export default router;