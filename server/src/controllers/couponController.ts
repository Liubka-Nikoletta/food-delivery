import {Request, Response} from 'express';
import Coupon from '../models/Coupon.js';

class CouponController {
    async getCoupons(req: Request, res: Response) {
        try{
           const coupons = await Coupon.find();

           return res.status(200).json(coupons);
        }catch(err: any){
            console.log(err, 'Error getting coupons');
            res.status(500).json({ message: "Error getting coupons", error: err.message });
        }
    }
}

export default new CouponController();

