// src/app.js
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // si lo tenés

const app = express();

app.use(express.json());

// rutas
app.use("/products", productRoutes);

app.use("/auth", authRoutes); // si corresponde

export default app;

