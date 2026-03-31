import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    usageLimit: { type: Number },
    applicableTo: { type: String, enum: ['all', 'category', 'shop'] },
    categories: [String],
    shopIds: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;