import express from "express";
import { allTxn, deleteUser, getProcessingOrders, getUsersData, stats, updateOrder, updatePrice, editUserRole, updateStock } from "../controller/admin.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";
import { queryPoints, queryPointsPh } from "../controller/queryPoints.js";

const router = express.Router();

router.get("/processing",verifyToken,isAdmin,getProcessingOrders);
router.get("/users_data",verifyToken,isAdmin,getUsersData);
router.get("/alltxn",verifyToken,isAdmin,allTxn);
router.get("/stats",stats);
router.get("/deleteuser/:email",verifyToken,isAdmin,deleteUser);
router.get("/updateorder/:orderId/:status1/:reason1",verifyToken,isAdmin,updateOrder);
// router.get("/updateitem/:itemId/:price",verifyToken,isAdmin,updatePrice);
router.get("/updateitem/:itemId/:price/:resellPrice", verifyToken, isAdmin, updatePrice); // Added resellPrice
router.post("/updateinstock", verifyToken, isAdmin, updateStock);
router.get("/edituser/:email", verifyToken, isAdmin, editUserRole);
router.post("/querypoints", verifyToken, isAdmin, queryPoints);
router.post("/querypoints/:ph", verifyToken, isAdmin, queryPointsPh);
export default router;