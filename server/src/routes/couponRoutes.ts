import express from 'express';
import couponController from '../controllers/couponController.js'

const router = express.Router();

router.get('/coupons', couponController.getCoupons);

export default router;