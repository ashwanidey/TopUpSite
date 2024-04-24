import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { authCheck } from "./middleware/verifyToken.js";
import Product from "./models/Products.js";
import Items from "./models/Items.js";
import productRoutes from "./routes/products.js"

import { products, items } from "./data/index.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.get("/show", (req, res) => {
//   console.log("Unprotected Route");
//   res.send("Unprotected Route");
// });

app.use("/product",productRoutes)

// app.get("/protected", authCheck, (req, res) => {
//   console.log("Protected Route");
//   res.send("Protected Route");
// });

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // Product.insertMany(products);
    // Items.insertMany(items);
  })
  .catch((error) => console.log(`${error} did not connect`));
