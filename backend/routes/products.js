import express from "express";
import { getGames, getOtt, getProduct, getTrending } from "../controller/products.js";

const router = express.Router();

router.get("/games",getGames);
router.get("/ott",getOtt);
router.get("/trending",getTrending);
router.get("/eachproduct/:productId",getProduct);
export default router;