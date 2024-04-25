import express from "express"
import { getItems } from "../controller/items.js";

const router = express.Router();

router.get("/:productId",getItems)

export default router;