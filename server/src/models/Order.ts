import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userData: {
        email: {
            type: String,
            required: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Введіть дійсний email адресу']
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
            match: [/^\+?[0-9]{10,15}$/, 'Введіть дійсний номер телефону']
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Кількість не може бути меншою за 1']
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;