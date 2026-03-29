import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Ціна не може бути від\'ємною']
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    image_url: {
        type: String,
        required: true,
        trim: true,
    }
});

const Product = mongoose.model('Product', productSchema, 'products');

export default Product;