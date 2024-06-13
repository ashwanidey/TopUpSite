import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url';

import { authCheck, checkScopes } from "./middleware/verifyToken.js";
import Product from "./models/Products.js";
import Items from "./models/Items.js";
import User from "./models/User.js";
import productRoutes from "./routes/products.js";
import itemRoutes from "./routes/items.js";
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import verifyRoutes from "./routes/verify.js";
import passwordRoutes from "./routes/forgetPassword.js";
import userRoutes from "./routes/user.js";

import { products, items } from "./data/index.js";
import { isAdmin, verifyToken } from "./middleware/auth.js";

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

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Your existing routes
app.use("/item", itemRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/verify", verifyRoutes);
app.use("/password", passwordRoutes);
app.use("/user", userRoutes);

// app.get("/test",verifyToken,isAdmin,(req,res)=>{
//   console.log("in")
//   res.json({"msg":"success"})
// });


// Serve static files based on environment
if (process.env.NODE_MODE === "production") {
  // Serve static files from the React app in production
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  // Serve a message indicating the API is running in development
  app.get("/", (req, res) => {
    res.send("API is running in development mode.");
  });
}

// Additional routes
app.get("/keep-alive", (req, res) => {
  res.send("Server is alive.");
});

app.get("/protected", authCheck, checkScopes, (req, res) => {
  res.send("Protected");
});

const PORT = process.env.PORT || 3001;

const insertData = async () => {
  let dataInserted = false;

  try {
    const productCount = await Product.countDocuments();
    const itemCount = await Items.countDocuments();
    const userCount = await User.countDocuments();
    
    if (productCount === 0) {
      await Product.insertMany(products);
      dataInserted = true;
    }
    if (itemCount === 0) {
      await Items.insertMany(items);
      dataInserted = true;
    }
    if (userCount === 0) {
      const dummyUser = {
        name: "Dummy User",
        mobilenumber: "1234567890",
        userid: "dummyuser",
        email: "dummyuser@example.com",
        password: "dummyPassword",
        verified: "false",
        role: "user",
        picturePath: "",
      };
      await User.create(dummyUser);
      dataInserted = true;
    }
    
    if (dataInserted) {
      console.log("Data inserted successfully");
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    insertData().then(() => {
      app.listen(PORT, () => console.log(`Server is running at Port: ${PORT}`));
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
