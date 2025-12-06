// src/controllers/authController.js
import jwt from 'jsonwebtoken';

// Credenciales hardcodeadas
const VALID_EMAIL = 'test@gmail.com';
const VALID_PASSWORD = '123456';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validar que se envíen credenciales
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email y contraseña son requeridos' 
      });
    }

    // Validar credenciales
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Generar JWT
      const token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET || 'secret_key_default',
        { expiresIn: '2h' }
      );

      return res.json({ 
        message: 'Login exitoso',
        token: token 
      });
    }

    return res.status(401).json({ 
      message: 'Credenciales inválidas' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
