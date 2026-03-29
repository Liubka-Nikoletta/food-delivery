import express from 'express';
import ShopController from "../controllers/shopController.js";

const router = express.Router();

router.get('/shops', ShopController.getShops);
router.post('/shops', ShopController.getShopById)

export default router;