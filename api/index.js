// index.js (solo para desarrollo local)
import app from './src/app.js';

import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
