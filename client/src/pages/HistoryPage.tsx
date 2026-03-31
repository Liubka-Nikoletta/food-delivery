import { useState } from "react";
import { useCart } from "../context/CartContext.tsx";
import Header from "../components/layout/Header.tsx";
import api from "../api/api.ts";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { addManyToCart } = useCart();
    const navigate = useNavigate();

    const fetchOrders = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/orders/history', { email, phoneNumber: phone });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReorder = (orderItems: any[]) => {
        const itemsToCart = orderItems.map(item => ({
            _id: item.productId._id,
            name: item.productId.name,
            image_url: item.productId.image_url,
            price: item.price || item.productId.price,
            quantity: item.quantity,
            shop_id: item.productId.shop_id
        }));
        addManyToCart(itemsToCart);
        navigate('/cart');
    };
    return (
        <div>
            <Header />
            <main className="p-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Order History</h1>

                <form onSubmit={fetchOrders} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 bg-white p-6 rounded-2xl border border-(--color-border)">
                    <input
                        type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                        className="border border-(--color-border-strong) rounded-xl px-4 py-2 outline-none focus:border-(--color-accent)"
                        required
                    />
                    <input
                        type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)}
                        className="border border-(--color-border-strong) rounded-xl px-4 py-2 outline-none focus:border-(--color-accent)"
                        required
                    />
                    <button type="submit" className="bg-(--color-accent) font-bold py-2 rounded-xl">Search</button>
                </form>

                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="border border-(--color-border) rounded-2xl p-6 bg-white shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-(--color-text-muted)">Order ID: {order._id}</p>
                                    <p className="font-bold text-lg">Total: {order.totalPrice} грн</p>
                                </div>
                                <button
                                    onClick={() => handleReorder(order.items)}
                                    className="bg-(--color-accent) text-sm font-bold px-6 py-2 rounded-full hover:bg-(--color-accent-dark) transition-colors"
                                >
                                    Reorder
                                </button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {order.items.map((item: any) => (
                                    <div key={item._id} className="shrink-0 text-center w-24">
                                        <img src={item.productId.image_url} className="w-16 h-16 object-cover rounded-lg mx-auto" crossOrigin="anonymous"/>
                                        <p className="text-xs font-medium truncate mt-1">{item.productId.name}</p>
                                        <p className="text-xs text-(--color-text-muted)">x{item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {!isLoading && orders.length === 0 && (
                        <p className="text-center text-(--color-text-muted)">No orders found. Enter your credentials to see history.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HistoryPage;