import express from "express";
import { allTxn, deleteUser, getProcessingOrders, getUsersData, updateOrder, updatePrice } from "../controller/admin.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/processing",verifyToken,isAdmin,getProcessingOrders);
router.get("/usersdata",verifyToken,isAdmin,getUsersData);
router.get("/alltxn",verifyToken,isAdmin,allTxn);
router.get("/deleteuser/:email",verifyToken,isAdmin,deleteUser);
router.get("/updateorder/:orderId/:status1/:reason1",verifyToken,isAdmin,updateOrder);
router.get("/updateitem/:itemId/:price",verifyToken,isAdmin,updatePrice);
export default router;