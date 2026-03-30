import * as React from "react";

interface CardListProps {
    children?: React.ReactNode;
    isEmpty?: boolean;
    emptyMessage?: string;
}

const CardList = ({children, isEmpty = false, emptyMessage = 'Nothing found'}: CardListProps) => {
    if (isEmpty) {
        return <p className="text-(--color-text-muted)">{emptyMessage}</p>;
    }

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </ul>
    );
};

export default CardList;