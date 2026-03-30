import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext.tsx";

const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const { totalItems } = useCart();

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-(--color-bg) border-b border-(--color-border)">
            <div className="flex-1 flex justify-start">
                <Link to="/">
                    <p className="text-[28px] font-extrabold text-(--color-text-heading) tracking-tight cursor-pointer">
                        delivery<span className="text-(--color-accent)">.</span>
                    </p>
                </Link>
            </div>

            <nav className="flex-1 flex justify-center">
                <ul className="flex items-center gap-4">
                    <li>
                        <Link
                            to="/"
                            className={`block px-6 py-2.5 rounded-full font-bold text-[15px] transition-colors ${
                                isHomePage
                                    ? "bg-(--color-accent) text-(--color-text-heading) hover:bg-(--color-accent-dark)"
                                    : "text-(--color-text) hover:text-(--color-text-heading) bg-transparent"
                            }`}
                        >
                            Shops
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex-1 flex justify-end">
                <Link to="/cart" className="flex items-center gap-2 group cursor-pointer">
                    <span className="text-(--color-text) font-semibold text-[16px] group-hover:text-(--color-text-heading) transition-colors">
                        Cart
                    </span>

                    {totalItems > 0 && (
                        <div className="bg-(--color-accent) text-(--color-text-heading) w-6 h-6 rounded-full flex items-center justify-center font-bold text-[14px]">
                            {totalItems}
                        </div>
                    )}
                </Link>
            </div>

        </header>
    );
};

export default Header;