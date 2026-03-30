import {Request, Response} from 'express';
import Shop from '../models/Shop.js';

class ShopController {
    async getShops(req: Request, res: Response) {
        try{
            const { rating } = req.query;

            let filter: any = {};

            if (rating && rating !== 'Всі') {
                if (rating === '4-5') {
                    filter.rating = { $gte: 4, $lte: 5 };
                } else if (rating === '3-4') {
                    filter.rating = { $gte: 3, $lt: 4 };
                } else if (rating === '2-3') {
                    filter.rating = { $gte: 2, $lt: 3 };
                }
            }

            const shops = await Shop.find(filter);

            return res.status(200).json(shops);
        }catch(err: any){
            console.log(err, 'Error getting shops');
            return res.status(500).json({ message: "Error getting shops", error: err.message });
        }
    }

    async getShopById(req: Request, res: Response) {
        try{
            const _id = req.body;

            const shop = await Shop.findById(_id);
            return res.status(200).json(shop);
        }catch(err: any){
            console.log(err, 'Error getting shop');
            return res.status(500).json({ message: "Error getting shop", error: err.message });
        }
    }
}

export default new ShopController();