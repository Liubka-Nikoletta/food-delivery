import {Request, Response} from 'express';
import Product from "../models/Product.js";
import { decodeId } from '../utils/hashid.js';

class ProductController {
    async getProductsByShopId(req: Request, res: Response){
        try{
            const { shop_id } = req.body;

            if (!shop_id) {
                return res.status(400).json({ message: "shop_id is missing in request body" });
            }

            const products = await Product.find({ shop_id: shop_id });

            return res.status(200).json(products);
        }catch(err){
            console.log(err, 'Error in getting products');
            res.status(400).send({error: 'Products not found'});
        }
    }
    async getProductById(req: Request, res: Response){
        try{
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "Hash is missing" });
            }

            const originalId = decodeId(id);

            if (!originalId) {
                return res.status(400).json({ message: "Invalid hash" });
            }

            const product = await Product.findById(originalId);
            return res.status(200).json(product);
        }catch(err){
            console.log(err, 'Error in getting product');
            res.status(400).send({error: 'Error in getting product'});
        }
    }
}

export default new ProductController();