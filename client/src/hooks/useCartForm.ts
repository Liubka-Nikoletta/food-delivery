import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.ts";

export const useCartForm = (cartItems: any[], clearCart: () => void) => {
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const totalPrice = cartItems.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        return sum + (itemPrice * item.quantity);
    }, 0);

    const discount = appliedCoupon ? (totalPrice * appliedCoupon.value) / 100 : 0;
    const finalTotal = totalPrice - discount;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^\+?380\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
            newErrors.phone = "Format: +380XXXXXXXXX";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const applyCoupon = async () => {
        try {
            const res = await api.get('/coupons');
            const coupon = res.data.find((c: any) => c.code.toUpperCase() === couponCode.toUpperCase());
            if (coupon) {
                setAppliedCoupon(coupon);
                setCouponCode("");
            } else {
                alert("Coupon not found or expired");
            }
        } catch (err) {
            console.error("Error validating coupon");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (cartItems.length === 0) return alert("Your cart is empty.");

        setIsSubmitting(true);
        try {
            const orderPayload = {
                userData: {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phone,
                    address: formData.address
                },
                items: cartItems.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: finalTotal
            };

            await api.post('/orders', orderPayload);
            setSubmitSuccess(true);
            clearCart();
            setTimeout(() => navigate('/'), 3000);
        } catch (error) {
            console.error("Error creating order:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData, errors, isSubmitting, submitSuccess,
        totalPrice, discount, finalTotal, couponCode, appliedCoupon,
        setCouponCode, handleChange, handleSubmit, applyCoupon
    };
};