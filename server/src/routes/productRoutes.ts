import express from 'express';
import ProductController from '../controllers/productController.js';

const router = express.Router();

router.post('/products', ProductController.getProductsByShopId);
router.get('/products/:id', ProductController.getProductById);

export default router;