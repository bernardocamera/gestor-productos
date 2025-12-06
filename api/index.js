// api/index.js - Serverless function for Vercel
import app from '../src/app.js';

// Log para debug en Vercel
console.log('[Vercel] API handler initialized');
console.log('[Vercel] Environment variables available:', {
  hasFirebaseKey: !!process.env.FIREBASE_KEY_BASE64,
  hasJWT: !!process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV
});

export default app;
