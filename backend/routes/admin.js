import express from "express";
import { allTxn, deleteUser, getProcessingOrders, getUsersData, stats, updateOrder, updatePrice, editUserRole } from "../controller/admin.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/processing",verifyToken,isAdmin,getProcessingOrders);
router.get("/users_data",verifyToken,isAdmin,getUsersData);
router.get("/alltxn",verifyToken,isAdmin,allTxn);
router.get("/stats",stats);
router.get("/deleteuser/:email",verifyToken,isAdmin,deleteUser);
router.get("/updateorder/:orderId/:status1/:reason1",verifyToken,isAdmin,updateOrder);
// router.get("/updateitem/:itemId/:price",verifyToken,isAdmin,updatePrice);
router.get("/updateitem/:itemId/:price/:resellPrice", verifyToken, isAdmin, updatePrice); // Added resellPrice
router.get("/edituser/:email", verifyToken, isAdmin, editUserRole);
export default router;