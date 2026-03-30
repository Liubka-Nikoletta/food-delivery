import CategoryFilter from "./CategoryFilter.tsx";
import SortDropdown from "./SortDropdown.tsx";

interface ProductControlsProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    sortOption: string;
    onSortChange: (option: string) => void;
}

const ProductControls = ({ categories, selectedCategory, onSelectCategory, sortOption, onSortChange }: ProductControlsProps) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />

            <SortDropdown
                sortOption={sortOption}
                onSortChange={onSortChange}
            />
        </div>
    );
};

export default ProductControls;