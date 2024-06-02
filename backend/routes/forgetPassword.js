import express from "express";
import { forgetPassword, resetPassword } from "../controller/forgetPassword.js";


const router = express.Router();

router.post("/forgetpassword",forgetPassword)
router.post("/reset-password/:id/:token",resetPassword)
export default router;