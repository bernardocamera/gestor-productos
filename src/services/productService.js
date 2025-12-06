// src/services/productService.js

import {
    getAllProducts as modelGetAllProducts,
    getProductById as modelGetProductById,
    addProduct as modelAddProduct,
    deleteProduct as modelDeleteProduct,
    updateProduct as modelUpdateProduct
} from "../models/productModel.js";

// Obtener todos los productos
export async function getAllProducts() {
    return modelGetAllProducts();
}

// Obtener producto por ID
export async function getProductById(id) {
    if (!id) {
        throw new Error("El ID es obligatorio");
    }

    return modelGetProductById(id);
}

// Crear producto
export async function createProduct(data) {
    if (!data.title) {
        throw new Error("El producto debe tener un título.");
    }
    if (!data.price || isNaN(data.price)) {
        throw new Error("El producto debe tener un precio válido.");
    }

    return modelAddProduct(data);
}

// Eliminar producto
export async function deleteProduct(id) {
    if (!id) {
        throw new Error("El ID es obligatorio");
    }

    return modelDeleteProduct(id);
}

// Actualizar producto
export async function updateProduct(id, data) {
    if (!id) {
        throw new Error("El ID es obligatorio");
    }
    if (!data || Object.keys(data).length === 0) {
        throw new Error("Los datos a actualizar son obligatorios");
    }

    return modelUpdateProduct(id, data);
}
