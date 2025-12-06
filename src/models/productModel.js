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
        const err = new Error(`Documento con ID ${id} no encontrado`);
        err.code = "NOT_FOUND";
        throw err;
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
    const docRef = db.collection("productos").doc(id);
    const snap = await docRef.get();

    if (!snap.exists) {
        const err = new Error(`Documento con ID ${id} no encontrado`);
        err.code = "NOT_FOUND";
        throw err;
    }

    await docRef.delete();

    return { message: `Documento ${id} eliminado correctamente` };
}

// ======================================================
// PATCH → Actualizar parcialmente
// ======================================================
export async function updateProduct(id, data) {
    const docRef = db.collection("productos").doc(id);
    const snap = await docRef.get();

    if (!snap.exists) {
        const err = new Error(`Documento con ID ${id} no encontrado`);
        err.code = "NOT_FOUND";
        throw err;
    }

    await docRef.update(data);

    const updated = await docRef.get();

    return { id: updated.id, ...updated.data() };
}

// ======================================================
// PUT → Reemplazar COMPLETAMENTE el producto
// ======================================================
export async function replaceProduct(id, data) {
    const docRef = db.collection("productos").doc(id);
    const snap = await docRef.get();

    if (!snap.exists) {
        const err = new Error(`Documento con ID ${id} no encontrado`);
        err.code = "NOT_FOUND";
        throw err;
    }

    // set() reemplaza todo (equivalente a PUT)
    await docRef.set(data);

    return { id, ...data };
}
