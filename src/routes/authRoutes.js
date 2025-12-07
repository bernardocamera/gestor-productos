import express from "express";
import { Router } from "express";
import { generateToken } from "../auth/jwt.js";

const router = Router();

// Login con email + password hardcodeados
router.post("/login", express.json(), (req, res) => {
    
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ error: "Email y password requeridos" });
    }

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
