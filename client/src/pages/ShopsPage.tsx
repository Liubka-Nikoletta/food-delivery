import Header from "../components/layout/Header.tsx";
import api from '../api/api.ts';
import {useEffect, useState} from "react";
import type IShop from "../types/shop.ts";
import Card from "../components/ui/Card.tsx";
import CardList from "../components/ui/CardList.tsx";
import { useNavigate } from "react-router-dom";
import { encodeId } from "../utils/hashids.ts";

const ShopsPage = () => {
    const [shops, setShops] = useState<IShop[]>([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRating, setSelectedRating] = useState<string>("All");

    const RATINGS = ["All", "4-5", "3-4", "2-3"];

    useEffect(() => {
        const loadShops = async () => {
            setIsLoading(true);
            try{
                const response = await api.get('/shops', {
                    params: selectedRating !== "All" ? { rating: selectedRating } : {}
                });
                setShops(response.data);
            }catch (error){
                console.log(error, 'Error loading shops');
            }finally {
                setIsLoading(false);
            }
        }

        loadShops();
    }, [selectedRating]);

    return (
        <div>
            <Header/>
            <main className="main p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-[12px] font-bold text-(--color-text-muted) uppercase tracking-wider shrink-0">
                        Rating
                    </span>
                    <div className="flex items-center gap-2">
                        {RATINGS.map(rating => (
                            <button
                                key={rating}
                                onClick={() => setSelectedRating(rating)}
                                className={`px-5 py-2 rounded-full font-semibold text-[15px] whitespace-nowrap transition-colors duration-200 ${
                                    selectedRating === rating
                                        ? "bg-(--color-accent) text-(--color-text-heading) border border-(--color-accent)"
                                        : "bg-white text-(--color-text) border border-(--color-border-strong) hover:border-(--color-accent-border)"
                                }`}
                            >
                                {rating === "All" ? "All" : `★ ${rating}`}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <p className="text-(--color-text-muted) font-medium animate-pulse">Loading shops...</p>
                    </div>
                ) : (
                    <CardList isEmpty={shops.length === 0} emptyMessage='No stores found for this rating.'>
                        {shops.map((shop) => {
                            const rawId = shop._id;

                            return (
                                <Card
                                    key={rawId}
                                    title={shop.name}
                                    image={shop.logo_url}
                                    rating={shop.rating}
                                    onClick={() => navigate(`/shops/${encodeId(rawId)}`, { state: { shop } })}
                                />
                            )
                        })}
                    </CardList>
                )}
            </main>
        </div>
    );
};

export default ShopsPage;