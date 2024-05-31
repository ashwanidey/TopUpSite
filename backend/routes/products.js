import express from "express";
import { getAllProducts, getGames, getOtt, getProduct, getTrending } from "../controller/products.js";
import { authCheck, checkScopes } from "../middleware/verifyToken.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/games",getGames);
router.get("/ott",getOtt);
router.get("/trending",getTrending);
router.get("/eachproduct/:productId",getProduct);
router.get("/allproducts",verifyToken,isAdmin,getAllProducts);
export default router;