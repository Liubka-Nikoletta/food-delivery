import { useCart } from "../context/CartContext.tsx";
import Header from "../components/layout/Header.tsx";
import { Link } from "react-router-dom";
import CartItem from "../components/cart/CartItem.tsx";
import OrderForm from "../components/cart/OrderForm.tsx";
import {useCartForm} from "../hooks/useCartForm.ts"

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

    const {
        formData, errors, isSubmitting, submitSuccess,
        totalPrice, discount, finalTotal, couponCode, appliedCoupon,
        setCouponCode, handleChange, handleSubmit, applyCoupon
    } = useCartForm(cartItems, clearCart);

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