// src/app.js
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API OK");
});

// exportación obligatoria
export default app;
