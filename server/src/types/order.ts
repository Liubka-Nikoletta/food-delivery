import mongoose from "mongoose";

export default interface IOrder {
    userData: {
        email: string,
        phoneNumber: string,
        address: string,
    },
    items: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[],
    totalPrice: number
}
