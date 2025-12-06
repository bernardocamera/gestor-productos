// src/app.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
