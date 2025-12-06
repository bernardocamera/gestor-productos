import { Router } from "express";
import { generateToken } from "../auth/jwt.js";

const router = Router();

// Login con email + password hardcodeados
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Usuario válido HARDCODEADO
  const validUser = {
    email: "test@gmail.com",
    password: "123456",
    id: "user_test_001"
  };

  if (email !== validUser.email || password !== validUser.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generamos token con el userId
  const token = generateToken(validUser.id);

  res.json({ 
    message: "Login OK",
    token 
  });
});

export default router;
