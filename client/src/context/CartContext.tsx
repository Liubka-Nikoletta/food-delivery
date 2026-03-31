import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';
import type {ICartItem} from '../types/cartItem.ts';

interface CartContextType {
    cartItems: ICartItem[];
    addToCart: (product: ICartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, amount: number) => void;
    clearCart: () => void;
    totalItems: number;
    addManyToCart: (items: ICartItem[]) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: ICartItem) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item._id === product._id);
            if (existingItem) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const updateQuantity = (id: string, amount: number) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item._id === id) {
                    const newQuantity = item.quantity + amount;
                    return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
                }
                return item;
            })
        );
    };

    const addManyToCart = (newItems: ICartItem[]) => {
        setCartItems(prev => {
            const updatedCart = [...prev];
            newItems.forEach(newItem => {
                const existingIndex = updatedCart.findIndex(item => item._id === newItem._id);

                const price = Number(newItem.price);

                if (existingIndex > -1) {
                    updatedCart[existingIndex].quantity += newItem.quantity;
                } else {
                    updatedCart.push({ ...newItem, price });
                }
            });
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, addManyToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};