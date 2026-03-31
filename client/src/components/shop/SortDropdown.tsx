interface SortDropdownProps {
    sortOption: string;
    onSortChange: (option: string) => void;
}

const SortDropdown = ({ sortOption, onSortChange }: SortDropdownProps) => {
    return (
        <div className="shrink-0 relative">
            <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-(--color-border-strong) text-(--color-text-heading) font-medium rounded-xl pl-4 pr-10 py-2.5 outline-none focus:border-(--color-accent) hover:border-(--color-accent-border) cursor-pointer transition-colors w-full sm:w-auto shadow-sm"
            >
                <option value="">Sort by</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-(--color-text-muted)">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    );
};

export default SortDropdown;