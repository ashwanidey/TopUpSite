import express from "express";
import { authCheck, checkScopes } from "../middleware/verifyToken.js";
import { getProcessingOrders, updateOrder } from "../controller/admin.js";

const router = express.Router();

router.get("/processing",authCheck,checkScopes,getProcessingOrders);
router.get("/updateorder/:orderId/:status1/:reason1",authCheck,checkScopes,updateOrder);
export default router;