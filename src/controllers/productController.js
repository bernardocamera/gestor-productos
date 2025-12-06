// src/controllers/productController.js

import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
} from '../services/productService.js';
import { updateProduct } from '../services/productService.js';

// GET /products
export async function getProducts(req, res) {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /products/:id
export async function getProduct(req, res) {
    try {
        const product = await getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// POST /products
export async function addProduct(req, res) {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE /products/:id
export async function removeProduct(req, res) {
    try {
        const deleted = await deleteProduct(req.params.id);
        res.status(200).json({ message: "Producto eliminado", deleted });
    } catch (error) {
        console.error('Error en removeProduct:', error.message);
        if (error.code === 'NOT_FOUND' || error.message.includes("no encontrado")) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}

// PATCH /products/:id
export async function modifyProduct(req, res) {
    try {
        const updated = await updateProduct(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        console.error('Error en modifyProduct:', error.message);
        if (error.code === 'NOT_FOUND' || error.message.includes("no encontrado")) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
}
