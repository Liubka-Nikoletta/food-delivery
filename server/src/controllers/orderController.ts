import {Request, Response} from 'express';
import Order from '../models/Order.js';
import IOrder from "../types/order.js";
import {QueryFilter} from "mongoose";

class OrderController {
    async createOrder(req: Request, res: Response) {
        try{
            const data = req.body;
            const order = new Order(data);

            await order.save();
            return res.status(201).json(order);
        }catch(err: any){
            console.log(err, 'Error creating Order');
            return res.status(500).json({ message: "Error creating Order", error: err.message });
        }
    }

    async getOrders(req: Request, res: Response) {
        try{
            const {email, phoneNumber} = req.body;

            let filter: QueryFilter<IOrder> = {};

            if(email){
                filter['userData.email'] = email;
            }

            if(phoneNumber){
                filter['userData.phoneNumber'] = phoneNumber;
            }

            const orders = await Order.find(filter).populate('items.productId');

            return res.status(200).json(orders);
        }catch(err: any){
            console.log(err.message);
            return res.status(500).json({ message: "Error getting orders", error: err.message });
        }
    }
}

export default new OrderController();