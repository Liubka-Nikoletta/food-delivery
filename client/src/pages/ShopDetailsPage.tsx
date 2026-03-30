import {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import {decodeId} from "../utils/hashids.ts";
import api from "../api/api.ts";
import Header from "../components/layout/Header.tsx";
import CardList from "../components/ui/CardList.tsx";
import Card from "../components/ui/Card.tsx";
import type IShop from "../types/shop.ts";
import { useCart } from "../context/CartContext.tsx";

interface IProduct {
    _id: string;
    name: string;
    image_url: string;
    price: number;
}

const ShopDetailsPage = () => {
    const {hash} = useParams<{ hash: string }>();
    const location = useLocation();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
    const shop = location.state?.shop as IShop | undefined;

    const [categories, setCategories] = useState<string[]>(["All"]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    useEffect(() => {
        const loadProducts = async () => {
            if (!hash) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const shopId = decodeId(hash);

                const payload: { shop_id: string; category?: string } = {
                    shop_id: shopId
                };

                if (selectedCategory !== "All") {
                    payload.category = selectedCategory;
                }

                const response = await api.post('/products', payload);

                setProducts(response.data.products);
                setCategories(["All", ...response.data.categories]);
            } catch (error) {
                console.log(error, 'Error loading products');
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, [hash, selectedCategory]);

    return (
        <div>
            <Header/>
            <main className="main p-6 max-w-7xl mx-auto">
                {shop && (
                    <div className="mb-8 flex items-center gap-4">
                        <img src={shop.logo_url} alt={shop.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div>
                            <h1 className="text-3xl font-bold">{shop.name}</h1>
                            <p className="text-gray-500">Rating: {shop.rating}</p>
                        </div>
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
                <div className="flex items-center gap-2 mb-5">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full font-semibold text-[15px] whitespace-nowrap transition-colors duration-200 ${
                                selectedCategory === category
                                    ? "bg-(--color-accent) text-(--color-text-heading) border border-(--color-accent)"
                                    : "bg-white text-(--color-text) border border-(--color-border-strong) hover:border-(--color-accent-border)"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {isLoading ? (
                    <p>Loading products...</p>
                ) : (
                    <CardList isEmpty={products.length === 0} emptyMessage='No products found.'>
                        {products.map((product) => {
                            const cartItem = cartItems.find(item => item._id === product._id);
                            const currentShopId = decodeId(hash || '');

                            return (
                                <Card
                                    key={product._id}
                                    title={product.name}
                                    image={product.image_url}
                                    price={product.price}
                                    quantityInCart={cartItem?.quantity}
                                    onAddToCart={(e) => {
                                        e.stopPropagation();
                                        addToCart({ ...product, shop_id: currentShopId, quantity: 1 });
                                    }}
                                    onIncrement={(e) => {
                                        e.stopPropagation();
                                        updateQuantity(product._id, 1);
                                    }}
                                    onDecrement={(e) => {
                                        e.stopPropagation();
                                        if (cartItem && cartItem.quantity === 1) {
                                            removeFromCart(product._id);
                                        } else {
                                            updateQuantity(product._id, -1);
                                        }
                                    }}
                                />
                            )
                        })}
                    </CardList>
                )}
            </main>
        </div>
    );
};

export default ShopDetailsPage;