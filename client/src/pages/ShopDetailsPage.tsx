import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {decodeId} from "../utils/hashids.ts";
import api from "../api/api.ts";
import Header from "../components/layout/Header.tsx";
import CardList from "../components/ui/CardList.tsx";
import Card from "../components/ui/Card.tsx";

interface IProduct {
    _id: string;
    name: string;
    image_url: string;
    price: number;
}

const ShopDetailsPage = () => {
    const {hash} = useParams<{ hash: string }>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            if (!hash) {
                setIsLoading(false);
                return;
            }

            try {
                const shopId = decodeId(hash);

                const response = await api.post('/products', {
                    shop_id: shopId
                });

                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error, 'Error loading products');
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, [hash]);

    return (
        <div>
            <Header/>
            <main className="main p-6 max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Menu</h1>
                {isLoading ? (
                    <p>Loading products...</p>
                ) : (
                    <CardList isEmpty={products.length === 0} emptyMessage='No products found.'>
                        {products.map((product) => (
                            <Card
                                key={product._id}
                                title={product.name}
                                image={product.image_url}
                                price={product.price}
                            />
                        ))}
                    </CardList>
                )}
            </main>
        </div>
    );
};

export default ShopDetailsPage;