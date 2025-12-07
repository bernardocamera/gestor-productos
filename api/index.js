// index.js
import express from "express";
import dotenv from "dotenv";

import productRoutes from "./src/routes/productRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

export default app;


