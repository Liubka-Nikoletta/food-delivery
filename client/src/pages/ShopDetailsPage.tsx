import {useState, useEffect, useRef} from "react";
import {useParams, useLocation} from "react-router-dom";
import {decodeId} from "../utils/hashids.ts";
import api from "../api/api.ts";
import Header from "../components/layout/Header.tsx";
import CardList from "../components/ui/CardList.tsx";
import Card from "../components/ui/Card.tsx";
import type IShop from "../types/shop.ts";
import { useCart } from "../context/CartContext.tsx";
import ShopInfo from "../components/shop/ShopInfo.tsx";
import ProductControls from "../components/shop/ProductControls.tsx";

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

    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setPage(1);
        setProducts([]);
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
        setPage(1);
        setProducts([]);
    };

    useEffect(() => {
        const loadProducts = async () => {
            if (!hash) {
                setIsLoading(false);
                return;
            }

            if (page === 1) setIsLoading(true);
            else setIsFetchingMore(true);

            try {
                const shopId = decodeId(hash);

                const payload: any = {
                    shop_id: shopId,
                    page: page,
                    limit: 10
                };

                if (selectedCategory !== "All") {
                    payload.category = selectedCategory;
                }

                if (sortOption) {
                    payload.sortOption = sortOption;
                }

                const response = await api.post('/products', payload);

                if (page === 1) {
                    setProducts(response.data.products);
                    if (response.data.categories.length > 0) {
                        setCategories(["All", ...response.data.categories]);
                    }
                } else {
                    setProducts(prev => [...prev, ...response.data.products]);
                }

                setHasMore(response.data.hasMore);
            } catch (error) {
                console.log(error, 'Error loading products');
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        }
        loadProducts();
    }, [hash, selectedCategory, sortOption, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !isLoading && !isFetchingMore) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoading, isFetchingMore]);

    return (
        <div>
            <Header/>
            <main className="main p-6 max-w-7xl mx-auto">
                {shop && <ShopInfo shop={shop} />}

                <h2 className="text-2xl font-bold mb-6">Menu</h2>

                <ProductControls
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryChange}
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                />

                {isLoading ? (
                    <p>Loading products...</p>
                ) : (
                    <>
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
                                            if(e) e.stopPropagation();
                                            addToCart({ ...product, shop_id: currentShopId, quantity: 1 });
                                        }}
                                        onIncrement={(e) => {
                                            if(e) e.stopPropagation();
                                            updateQuantity(product._id, 1);
                                        }}
                                        onDecrement={(e) => {
                                            if(e) e.stopPropagation();
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

                        <div ref={observerTarget} className="h-10 w-full mt-4 flex items-center justify-center">
                            {isFetchingMore && (
                                <p className="text-(--color-text-muted) animate-pulse font-medium">
                                    Loading more products...
                                </p>
                            )}
                            {!hasMore && products.length > 0 && (
                                <p className="text-(--color-text-muted) text-sm">
                                    You have reached the end of the menu.
                                </p>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default ShopDetailsPage;