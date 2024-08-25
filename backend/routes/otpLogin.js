import express from "express";
const router = express.Router();

import { checkMobileNumber, timer, verifyMobileController } from "../controller/otpLogin.js";

router.post("/otp-login", checkMobileNumber);
router.post("/verify-otp", verifyMobileController);
router.post("/timer", timer);


export default router;