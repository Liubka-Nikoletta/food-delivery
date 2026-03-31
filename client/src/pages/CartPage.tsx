import { useState } from "react";
import { useCart } from "../context/CartContext.tsx";
import Header from "../components/layout/Header.tsx";
import api from "../api/api.ts";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import CartItem from "../components/ui/CartItem.tsx";
import OrderForm from "../components/ui/OrderForm.tsx";

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const totalPrice = cartItems.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        return sum + (itemPrice * item.quantity);
    }, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

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
                totalPrice: totalPrice
            };

            await api.post('/orders', orderPayload);

            setSubmitSuccess(true);
            clearCart();

            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            console.error("Error creating order:", error);
            alert("An error occurred while placing your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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

    const discount = appliedCoupon ? (totalPrice * appliedCoupon.value) / 100 : 0;
    const finalTotal = totalPrice - discount;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-extrabold text-(--color-text-heading) mb-8">Your cart</h1>

                {cartItems.length === 0 && !submitSuccess ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-(--color-text-muted) mb-4">Cart is empty.</p>
                        <Link to="/" className="text-(--color-accent) font-bold hover:underline">
                            Return to stores
                        </Link>
                    </div>
                ) : submitSuccess ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-(--color-border) shadow-sm">
                        <h2 className="text-2xl font-bold text-(--color-success) mb-2">The order has been successfully placed!</h2>
                        <p className="text-(--color-text-muted)">We will contact you shortly. Redirecting to the main page...</p>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1 flex flex-col gap-4 w-full">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>

                        <OrderForm
                            formData={formData}
                            errors={errors}
                            isSubmitting={isSubmitting}
                            totalPrice={totalPrice}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            couponCode={couponCode}
                            onCouponChange={setCouponCode}
                            onApplyCoupon={applyCoupon}
                            appliedCoupon={appliedCoupon}
                            discount={discount}
                            finalTotal={finalTotal}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default CartPage;