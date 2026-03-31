import * as React from "react";
import InputField from "../ui/InputField.tsx";

interface OrderFormProps {
    formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    errors: Record<string, string>;
    isSubmitting: boolean;
    totalPrice: number;
    couponCode: string;
    onCouponChange: (value: string) => void;
    onApplyCoupon: () => void;
    appliedCoupon: any;
    discount: number;
    finalTotal: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const OrderForm = ({ formData, errors, isSubmitting, totalPrice, onChange, onSubmit, couponCode, onCouponChange, onApplyCoupon, appliedCoupon, discount, finalTotal }: OrderFormProps) => {
    return (
        <div className="w-full lg:w-105 bg-white rounded-3xl border border-(--color-border) p-8 shadow-sm lg:sticky lg:top-6 shrink-0">
            <h2 className="text-[22px] font-extrabold text-(--color-text-heading) mb-6">Ordering</h2>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <InputField
                    label="Name"
                    name="name"
                    value={formData.name}
                    placeholder="Nikoletta Liubka"
                    onChange={onChange}
                    error={errors.name}
                />

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="you@email.com"
                    onChange={onChange}
                    error={errors.email}
                />

                <InputField
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="+380 xx xxx xx xx"
                    onChange={onChange}
                    error={errors.phone}
                />

                <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    placeholder="вул. Шевченка, 1, кв. 5"
                    onChange={onChange}
                    error={errors.address}
                />

                <div className="flex flex-col gap-1 mt-2">
                    <label className="text-[12px] font-bold text-(--color-text-muted) uppercase tracking-wider">Promo Code</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => onCouponChange(e.target.value)}
                            placeholder="SPRING30"
                            className="flex-1 bg-[#FAFAF8] border border-(--color-border-strong) rounded-xl px-4 py-2 outline-none focus:border-(--color-accent) transition-colors"
                        />
                        <button
                            type="button"
                            onClick={onApplyCoupon}
                            className="bg-(--color-text-heading) text-white px-4 py-2 rounded-xl font-bold text-[14px] hover:opacity-90 transition-opacity"
                        >
                            Apply
                        </button>
                    </div>
                    {appliedCoupon && (
                        <span className="text-(--color-success) text-[12px] font-bold mt-1">
                            ✓ Coupon "{appliedCoupon.code}" applied (-{appliedCoupon.value}%)
                        </span>
                    )}
                </div>

                <div className="border-t border-dashed border-(--color-border) mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-[15px] text-(--color-text-muted)">
                        <span>Subtotal</span>
                        <span>{totalPrice}грн</span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between text-[15px] text-(--color-danger) font-medium">
                            <span>Discount</span>
                            <span>-{discount}грн</span>
                        </div>
                    )}

                    <div className="flex items-end justify-between mt-2">
                        <span className="text-[16px] font-bold text-(--color-text-heading)">Total payable</span>
                        <span className="text-[28px] font-extrabold text-(--color-accent-dark) leading-none">
                            {finalTotal}грн
                        </span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-(--color-accent) text-(--color-text-heading) font-bold text-[16px] py-4 rounded-xl hover:bg-[#E69D00] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Processing..." : "Order"}
                </button>
            </form>
        </div>
    );
};

export default OrderForm;