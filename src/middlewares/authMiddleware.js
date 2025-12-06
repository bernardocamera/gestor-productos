// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Validar que exista el header
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Token no proporcionado' 
      });
    }

    // Extraer token (formato: Bearer <token>)
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ 
        message: 'Formato de token inválido' 
      });
    }

    const token = parts[1];

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret_key_default'
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: 'Token inválido o expirado' 
    });
  }
}
