import {Request, Response} from 'express';
import Product from "../models/Product.js";
import { decodeId } from '../utils/hashid.js';

class ProductController {
    async getProductsByShopId(req: Request, res: Response){
        try{
            const { shop_id, category, sortOption, page = 1, limit = 10 } = req.body;

            if (!shop_id) {
                return res.status(400).json({ message: "shop_id is missing in request body" });
            }

            const filter: any = { shop_id: shop_id };

            if (category && category !== "All") {
                filter.category = category;
            }

            let sortCriteria: any = {};
            if (sortOption === 'price_asc') sortCriteria = { price: 1 };
            else if (sortOption === 'price_desc') sortCriteria = { price: -1 };
            else if (sortOption === 'name_asc') sortCriteria = { name: 1 };

            const skip = (Number(page) - 1) * Number(limit);

            const products = await Product.find(filter)
                .sort(sortCriteria)
                .skip(skip)
                .limit(Number(limit));

            const totalProducts = await Product.countDocuments(filter);
            const hasMore = skip + products.length < totalProducts;

            let categories: string[] = [];
            if (Number(page) === 1) {
                categories = await Product.distinct("category", { shop_id: shop_id });
            }

            return res.status(200).json({
                products: products,
                categories: categories,
                hasMore: hasMore
            });
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