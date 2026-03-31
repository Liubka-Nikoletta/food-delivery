import type {ICartItem} from '../../types/cartItem.ts';
import QuantityControl from "../ui/QuantityControl.tsx";

interface CartItemProps {
    item: ICartItem;
    onUpdateQuantity: (id: string, amount: number) => void;
    onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    return (
        <div className="bg-white rounded-2xl border border-(--color-border) p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 bg-(--color-accent-light) rounded-xl shrink-0 overflow-hidden">
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-[17px] text-(--color-text-heading)">{item.name}</h3>
                    <p className="text-[14px] text-(--color-text-muted) font-medium">
                        {item.price}грн × {item.quantity} = <span className="text-(--color-text-heading) font-bold">{item.price * item.quantity}грн</span>
                    </p>
                </div>
            </div>

            <QuantityControl
                quantity={item.quantity}
                size="md"
                onIncrement={() => onUpdateQuantity(item._id, 1)}
                onDecrement={() => {
                    if (item.quantity === 1) {
                        onRemove(item._id);
                    } else {
                        onUpdateQuantity(item._id, -1);
                    }
                }}
            />
        </div>
    );
};

export default CartItem;