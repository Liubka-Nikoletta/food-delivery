import type IShop from "../../types/shop.ts";

interface ShopInfoProps {
    shop: IShop;
}

const ShopInfo = ({ shop }: ShopInfoProps) => {
    return (
        <div className="mb-8 flex items-center gap-4">
            <img src={shop.logo_url} alt={shop.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
            <div>
                <h1 className="text-3xl font-bold text-(--color-text-heading)">{shop.name}</h1>
                <p className="text-(--color-text-muted) mt-1 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4 text-(--color-accent) fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {shop.rating}
                </p>
            </div>
        </div>
    );
};

export default ShopInfo;