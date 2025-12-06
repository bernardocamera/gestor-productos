// src/data/data.js
import fs from "fs";
import admin from "firebase-admin";

// Leer clave de servicio
const serviceAccount = JSON.parse(
  fs.readFileSync("./src/config/firebaseKey.json", "utf8")
);

// Inicializar Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Instancia Firestore
const db = admin.firestore();

export default db;
