import * as React from "react";
import InputField from "./InputField.tsx";

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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const OrderForm = ({ formData, errors, isSubmitting, totalPrice, onChange, onSubmit }: OrderFormProps) => {
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

                <div className="flex items-end justify-between mt-4 mb-2">
                    <span className="text-[15px] font-medium text-(--color-text-muted)">Total payable</span>
                    <span className="text-[28px] font-extrabold text-(--color-accent-dark) leading-none">{totalPrice}грн</span>
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