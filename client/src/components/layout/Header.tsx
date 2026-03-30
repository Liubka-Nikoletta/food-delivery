const Header = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-(--color-bg) border-b border-(--color-border)">
            <div className="flex-1 flex justify-start">
                <p className="text-[28px] font-extrabold text-(--color-text-heading) tracking-tight cursor-pointer">
                    delivery<span className="text-(--color-accent)">.</span>
                </p>
            </div>

            <nav className="flex-1 flex justify-center">
                <ul className="flex items-center gap-4">
                    <li>
                        <a href="#" className="block bg-(--color-accent) text-(--color-text-heading) px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-(--color-accent-dark) transition-colors">
                            Shops
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="flex-1 flex justify-end">
                <button className="text-(--color-text) font-semibold text-[16px] hover:text-(--color-text-heading) transition-colors">
                    Basket
                </button>
            </div>

        </header>
    );
};

export default Header;