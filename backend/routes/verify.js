import express from "express";
import { email } from "../controller/verify.js";

const router = express.Router();

// router.post("/username", username);
router.post("/email", email);

export default router;