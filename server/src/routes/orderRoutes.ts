import express from 'express';
import OrderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', OrderController.createOrder);
router.post('/orders/search', OrderController.getOrders);

export default router;