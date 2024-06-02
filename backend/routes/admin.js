import express from "express";
import { getProcessingOrders, getUsersData, updateOrder, updatePrice } from "../controller/admin.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/processing",verifyToken,isAdmin,getProcessingOrders);
router.get("/usersdata",verifyToken,isAdmin,getUsersData);
router.get("/updateorder/:orderId/:status1/:reason1",verifyToken,isAdmin,updateOrder);
router.get("/updateitem/:itemId/:price",verifyToken,isAdmin,updatePrice);
export default router;