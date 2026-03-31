import {useEffect, useState} from 'react';
import type ICoupon from "../types/coupon.ts";
import Header from "../components/layout/Header.tsx";
import api from '../api/api.ts';

const CouponsPage = () => {
    const [coupons, setCoupons] = useState<ICoupon[]>([]);

    useEffect(() => {
        const getCoupons = async () => {
            try{
                const response = await api.get('/coupons');
                setCoupons(response.data);
            }catch (error){
                console.log(error);
            }
        }

        getCoupons();
    }, [])

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        alert(`Coupon ${code} copied to clipboard!`);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <Header />
            <main className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-(--color-text-heading) mb-2">Special Offers</h1>
                <p className="text-(--color-text-muted) mb-8 font-medium">Copy the code and apply it in your cart</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coupons.map(coupon => (
                        <div key={coupon._id} className="bg-white border border-(--color-border) rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            <div className="bg-(--color-accent) p-6 text-center relative overflow-hidden">
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAFAF8] rounded-full"></div>
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FAFAF8] rounded-full"></div>

                                <span className="text-4xl font-black text-(--color-text-heading)">{coupon.value}%</span>
                                <p className="font-bold uppercase tracking-tighter text-(--color-text-heading) opacity-80">OFF</p>
                            </div>

                            <div className="p-6 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold text-(--color-text-heading) mb-2">{coupon.title}</h3>
                                <p className="text-sm text-(--color-text-muted) mb-6 h-10 line-clamp-2">{coupon.description}</p>

                                <div className="w-full border-2 border-dashed border-(--color-border-strong) rounded-2xl p-3 mb-4 bg-[#FAFAF8] group-hover:border-(--color-accent) transition-colors">
                                    <span className="font-mono text-xl font-black tracking-widest text-(--color-text-heading)">{coupon.code}</span>
                                </div>

                                <button
                                    onClick={() => copyCode(coupon.code)}
                                    className="w-full bg-(--color-accent) text-(--color-text-heading) font-bold py-3 rounded-xl hover:bg-(--color-accent-dark) active:scale-95 transition-all"
                                >
                                    Copy Code
                                </button>

                                <p className="mt-4 text-[11px] text-(--color-text-muted) uppercase font-bold tracking-widest">
                                    Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CouponsPage;