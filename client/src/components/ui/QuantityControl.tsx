import * as React from "react";

interface QuantityControlProps {
    quantity: number;
    onIncrement: (e: React.MouseEvent) => void;
    onDecrement: (e: React.MouseEvent) => void;
    size?: "sm" | "md";
}

const QuantityControl = ({ quantity, onIncrement, onDecrement, size = "md" }: QuantityControlProps) => {
    const isSm = size === "sm";

    return (
        <div
            className={`flex items-center ${isSm ? 'gap-3 rounded-full' : 'gap-4 rounded-xl'} bg-(--color-accent-light) px-2 py-1 shrink-0`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                onClick={onDecrement}
                className={`${isSm ? 'w-7 h-7' : 'w-8 h-8'} flex items-center justify-center rounded-lg bg-white text-(--color-accent-dark) font-bold shadow-sm hover:bg-gray-50 transition-colors`}
            >
                −
            </button>
            <span className={`font-bold ${isSm ? 'text-[15px]' : 'text-[16px] w-6 text-center'}`}>
                {quantity}
            </span>
            <button
                type="button"
                onClick={onIncrement}
                className={`${isSm ? 'w-7 h-7' : 'w-8 h-8'} flex items-center justify-center rounded-lg bg-white text-(--color-accent-dark) font-bold shadow-sm hover:bg-gray-50 transition-colors`}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControl;