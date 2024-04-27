import express from "express";
import { authCheck, checkScopes } from "../middleware/verifyToken.js";
import { getProcessingOrders, updateOrder, updatePrice } from "../controller/admin.js";

const router = express.Router();

router.get("/processing",authCheck,checkScopes,getProcessingOrders);
router.get("/updateorder/:orderId/:status1/:reason1",authCheck,checkScopes,updateOrder);
router.get("/updateitem/:itemId/:price",authCheck,checkScopes,updatePrice);
export default router;