import {Request, Response} from 'express';
import Order from '../models/Order.js';
import IOrder from "../types/order.js";
import {QueryFilter} from "mongoose";

class OrderController {
    async createOrder(req: Request, res: Response) {
        try{
            const data = req.body;

            if (!data.items || data.items.length === 0) {
                return res.status(400).json({ message: "Order items are required" });
            }

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

            if (!email && !phoneNumber) {
                return res.status(400).json({ message: "Email or Phone number is required for search" });
            }

            let filter: any = {};

            if (email) {
                filter['userData.email'] = email;
            }

            if (phoneNumber) {
                filter['userData.phoneNumber'] = phoneNumber;
            }

            const orders = await Order.find(filter)
                .populate('items.productId')
                .sort({ createdAt: -1 });

            return res.status(200).json(orders);
        }catch(err: any){
            console.log(err.message);
            return res.status(500).json({ message: "Error getting orders", error: err.message });
        }
    }
}

export default new OrderController();