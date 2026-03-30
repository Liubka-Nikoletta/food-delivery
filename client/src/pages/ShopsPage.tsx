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

    useEffect(() => {
        const loadShops = async () => {
            try{
                const response = await api.get('/shops');
                setShops(response.data);
            }catch (error){
                console.log(error, 'Error loading shops');
            }
        }

        loadShops();
    }, []);

    return (
        <div>
            <Header/>
            <main className="main p-6 max-w-7xl mx-auto">
                <CardList isEmpty={shops.length === 0} emptyMessage='No stores found'>
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
            </main>
        </div>
    );
};

export default ShopsPage;