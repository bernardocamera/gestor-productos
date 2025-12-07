// src/routes/productRoutes.js
import express from "express";
import { Router } from "express";

import {
    getProducts,
    getProduct,
    addProduct,
    removeProduct,
    modifyProduct,
    replaceProduct
} from '../controllers/productController.js';

import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getProducts);                 
router.get('/:id', getProduct);               

router.post('/', express.json(), authenticate, addProduct);

router.patch('/:id', express.json(), authenticate, modifyProduct);

router.put('/:id', express.json(), authenticate, replaceProduct);

router.delete('/:id', authenticate, removeProduct);

export default router;
