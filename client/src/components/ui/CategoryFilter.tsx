interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-5 py-2 rounded-full font-semibold text-[15px] whitespace-nowrap transition-colors duration-200 ${
                        selectedCategory === category
                            ? "bg-(--color-accent) text-(--color-text-heading) border border-(--color-accent)"
                            : "bg-white text-(--color-text) border border-(--color-border-strong) hover:border-(--color-accent-border)"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;