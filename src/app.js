// src/app.js
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// NO usar JSON de forma global
// app.use(express.json());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API OK");
});

export default app;
