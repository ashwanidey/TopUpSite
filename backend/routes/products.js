import express from "express";
import { getGames, getOtt, getTrending } from "../controller/products.js";

const router = express.Router();

router.get("/games",getGames);
router.get("/ott",getOtt);
router.get("/trending",getTrending);
export default router;