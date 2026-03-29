import mongoose from "mongoose";

export default interface IProduct {
    shop_id: mongoose.Schema.Types.ObjectId,
    name: string,
    price: number,
    category: string,
    image_url: string
}
