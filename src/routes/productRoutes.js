// src/routes/productRoutes.js
import { Router } from 'express';
import {
    getProducts,
    getProduct,
    addProduct,
    removeProduct
} from '../controllers/productController.js';
import { modifyProduct } from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getProducts);                      // GET /products
router.get('/:id', getProduct);                    // GET /products/:id
router.post('/create', authenticate, addProduct);  // POST /products/create (protegida)
router.delete('/:id', authenticate, removeProduct); // DELETE /products/:id (protegida)
router.patch('/:id', authenticate, modifyProduct); // PATCH /products/:id (protegida)

export default router;
