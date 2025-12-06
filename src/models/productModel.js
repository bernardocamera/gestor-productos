// productModel.js

import db from "../data/data.js";

// ======================================================
// Obtener todos los documentos
// ======================================================
export async function getAllProducts() {
    const snapshot = await db.collection("productos").get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// ======================================================
// Obtener un documento por ID
// ======================================================
export async function getProductById(id) {
    const docRef = db.collection("productos").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
        throw new Error(`Documento con ID ${id} no encontrado`);
    }

    return { id: docSnap.id, ...docSnap.data() };
}

// ======================================================
// Agregar un documento nuevo
// ======================================================
export async function addProduct(data) {
    const docRef = await db.collection("productos").add(data);
    return { id: docRef.id, ...data };
}

// ======================================================
// Eliminar un documento por ID
// ======================================================
export async function deleteProduct(id) {
    try {
        const docRef = db.collection("productos").doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            const error = new Error(`Documento con ID ${id} no encontrado`);
            error.code = 'NOT_FOUND';
            throw error;
        }

        await docRef.delete();
        return { message: `Documento ${id} eliminado correctamente` };
    } catch (error) {
        if (error.code === 'NOT_FOUND' || error.message.includes('no encontrado')) {
            const notFoundError = new Error(`Documento con ID ${id} no encontrado`);
            notFoundError.code = 'NOT_FOUND';
            throw notFoundError;
        }
        throw error;
    }
}

// ======================================================
// Actualizar un documento por ID
// ======================================================
export async function updateProduct(id, data) {
    try {
        const docRef = db.collection("productos").doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            const error = new Error(`Documento con ID ${id} no encontrado`);
            error.code = 'NOT_FOUND';
            throw error;
        }

        await docRef.update(data);
        const updatedSnap = await docRef.get();
        return { id: updatedSnap.id, ...updatedSnap.data() };
    } catch (error) {
        if (error.code === 'NOT_FOUND' || error.message.includes('no encontrado')) {
            const notFoundError = new Error(`Documento con ID ${id} no encontrado`);
            notFoundError.code = 'NOT_FOUND';
            throw notFoundError;
        }
        throw error;
    }
}
