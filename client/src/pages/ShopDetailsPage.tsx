import {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import {decodeId} from "../utils/hashids.ts";
import api from "../api/api.ts";
import Header from "../components/layout/Header.tsx";
import CardList from "../components/ui/CardList.tsx";
import Card from "../components/ui/Card.tsx";
import type IShop from "../types/shop.ts";
import { useCart } from "../context/CartContext.tsx";
import ShopInfo from "../components/ui/ShopInfo.tsx";
import ProductControls from "../components/ui/ProductControls.tsx";

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

    const [sortOption, setSortOption] = useState<string>("");

    useEffect(() => {
        const loadProducts = async () => {
            if (!hash) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const shopId = decodeId(hash);

                const payload: { shop_id: string; category?: string; sortOption?: string } = {
                    shop_id: shopId
                };

                if (selectedCategory !== "All") {
                    payload.category = selectedCategory;
                }

                if (sortOption) {
                    payload.sortOption = sortOption;
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
    }, [hash, selectedCategory, sortOption]);

    return (
        <div>
            <Header/>
            <main className="main p-6 max-w-7xl mx-auto">
                {shop && <ShopInfo shop={shop} />}

                <h2 className="text-2xl font-bold mb-6">Menu</h2>

                <ProductControls
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                />

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