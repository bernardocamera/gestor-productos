// src/services/productService.js

import {
    getAllProducts as modelGetAll,
    getProductById as modelGetById,
    addProduct as modelAdd,
    deleteProduct as modelDelete,
    updateProduct as modelUpdate,
    replaceProduct as modelReplace
} from "../models/productModel.js";

// GET
export async function getAllProducts() {
    return modelGetAll();
}

// GET by ID
export async function getProductById(id) {
    if (!id) throw new Error("El ID es obligatorio");
    return modelGetById(id);
}

// POST
export async function createProduct(data) {
    if (!data.title)
        throw new Error("El producto debe tener un título.");
    if (!data.price || isNaN(data.price))
        throw new Error("El producto debe tener un precio válido.");

    return modelAdd(data);
}

// DELETE
export async function deleteProduct(id) {
    if (!id) throw new Error("El ID es obligatorio");
    return modelDelete(id);
}

// PATCH
export async function updateProduct(id, data) {
    if (!id) throw new Error("El ID es obligatorio");
    if (!data || Object.keys(data).length === 0)
        throw new Error("Los datos a actualizar son obligatorios");

    return modelUpdate(id, data);
}

// PUT (reemplazo completo)
export async function replaceProduct(id, data) {
    if (!id) {
        const err = new Error("El ID es obligatorio");
        err.code = "VALIDATION";
        throw err;
    }



    return modelReplace(id, data);
}
