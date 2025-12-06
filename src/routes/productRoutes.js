// src/routes/productRoutes.js
import { Router } from 'express';

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

router.get('/', getProducts);                      // GET /products
router.get('/:id', getProduct);                  // GET /products/:id
router.post('/create', authenticate, addProduct);  
router.delete('/:id', authenticate, removeProduct); 
router.patch('/:id', authenticate, modifyProduct); 
router.put('/:id', authenticate, replaceProduct); // PUT /products/:id

export default router;

