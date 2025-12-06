// src/data/data.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from "fs";
import admin from "firebase-admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Soporta tres formas de obtener credenciales de Firebase:
// 1) Variable de entorno `FIREBASE_KEY_BASE64` (recomendada para Vercel)
// 2) Archivo local `src/config/firebaseKey.json` (no versionado)
// 3) Archivo local `src/config/firebaseKey.json.local` (si lo renombraste)

let serviceAccount;

console.log('[Firebase] Initializing... checking credentials');

if (process.env.FIREBASE_KEY_BASE64) {
  console.log('[Firebase] Using FIREBASE_KEY_BASE64 from environment');
  try {
    const json = Buffer.from(process.env.FIREBASE_KEY_BASE64, "base64").toString("utf8");
    serviceAccount = JSON.parse(json);
    console.log('[Firebase] Credentials parsed successfully');
  } catch (error) {
    console.error('[Firebase] Error parsing FIREBASE_KEY_BASE64:', error.message);
    throw error;
  }
} else {
const configPath1 = join(__dirname, "..", "config", "firebaseKey.json");
const configPath2 = join(__dirname, "..", "config", "firebaseKey.json.local");

  
  console.log('[Firebase] FIREBASE_KEY_BASE64 not found, trying local files');
  
  if (fs.existsSync(configPath1)) {
    console.log('[Firebase] Using firebaseKey.json');
    serviceAccount = JSON.parse(fs.readFileSync(configPath1, "utf8"));
  } else if (fs.existsSync(configPath2)) {
    console.log('[Firebase] Using firebaseKey.json.local');
    serviceAccount = JSON.parse(fs.readFileSync(configPath2, "utf8"));
  } else {
    const error = new Error(
      "Firebase service account not found. Add FIREBASE_KEY_BASE64 env var or place src/config/firebaseKey.json"
    );
    console.error('[Firebase]', error.message);
    throw error;
  }
}

// Inicializar Admin SDK
console.log('[Firebase] Initializing Admin SDK');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Instancia Firestore
const db = admin.firestore();
console.log('[Firebase] Firestore instance created successfully');

export default db;
