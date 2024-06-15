import express from "express";
import { login,register, verifyMail } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifymail/:id/:token", verifyMail);
export default router;