// src/data/data.js
import fs from "fs";
import admin from "firebase-admin";

// Soporta tres formas de obtener credenciales de Firebase:
// 1) Variable de entorno `FIREBASE_KEY_BASE64` (recomendada para Vercel)
// 2) Archivo local `src/config/firebaseKey.json` (no versionado)
// 3) Archivo local `src/config/firebaseKey.json.local` (si lo renombraste)

let serviceAccount;

if (process.env.FIREBASE_KEY_BASE64) {
  const json = Buffer.from(process.env.FIREBASE_KEY_BASE64, "base64").toString("utf8");
  serviceAccount = JSON.parse(json);
} else if (fs.existsSync("./src/config/firebaseKey.json")) {
  serviceAccount = JSON.parse(fs.readFileSync("./src/config/firebaseKey.json", "utf8"));
} else if (fs.existsSync("./src/config/firebaseKey.json.local")) {
  serviceAccount = JSON.parse(fs.readFileSync("./src/config/firebaseKey.json.local", "utf8"));
} else {
  throw new Error(
    "Firebase service account not found. Add FIREBASE_KEY_BASE64 env var or place src/config/firebaseKey.json"
  );
}

// Inicializar Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Instancia Firestore
const db = admin.firestore();

export default db;
