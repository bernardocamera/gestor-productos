// src/controllers/productController.js

import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    replaceProduct as replaceProductService
} from "../services/productService.js";

// GET /products
export async function getProducts(req, res) {
    try {
        const data = await getAllProducts();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// GET /products/:id
export async function getProduct(req, res) {
    try {
        const data = await getProductById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// POST /products/create
export async function addProduct(req, res) {
    try {
        const data = await createProduct(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// DELETE /products/:id
export async function removeProduct(req, res) {
    try {
        const data = await deleteProduct(req.params.id);
        res.json(data);
    } catch (err) {
        if (err.code === "NOT_FOUND")
            return res.status(404).json({ error: err.message });

        res.status(500).json({ error: err.message });
    }
}

// PATCH /products/:id
export async function modifyProduct(req, res) {
    try {
        const data = await updateProduct(req.params.id, req.body);
        res.json(data);
    } catch (err) {
        if (err.code === "NOT_FOUND")
            return res.status(404).json({ error: err.message });

        res.status(500).json({ error: err.message });
    }
}

// PUT /products/:id → reemplazo completo
export async function replaceProduct(req, res) {
    try {
        const data = await replaceProductService(req.params.id, req.body);

        res.json({
            message: "Producto reemplazado",
            product: data
        });

    } catch (err) {
        if (err.code === "NOT_FOUND")
            return res.status(404).json({ error: err.message });

        if (err.code === "VALIDATION")
            return res.status(400).json({ error: err.message });

        res.status(500).json({ error: err.message });
    }
}
