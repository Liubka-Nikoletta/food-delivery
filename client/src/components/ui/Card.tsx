interface CardProps {
    title: string;
    image: string;
    rating?: number;
    price?: number;
}

const Card = (data: CardProps) => {
    return (
        <li
            key={data.title}
            className="bg-white rounded-[20px] border border-(--color-border) overflow-hidden hover:border-(--color-accent) transition-colors duration-200 cursor-pointer flex flex-col"
        >
            <div className="h-30 w-full bg-(--color-accent-light)">
                <img
                    src={data.image}
                    alt={`${data.title} cover`}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 bg-white flex flex-col gap-1">
                <h3 className="text-(--color-text-heading) font-semibold text-[17px]">
                    {data.title}
                </h3>

                {data.rating ? (
                    <div className="flex items-center gap-3 text-[14px] font-medium mt-1">
                        <div className="flex items-center gap-1 text-(--color-accent)">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            <span>{data.rating}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 text-[14px] font-medium mt-1">
                        <div className="flex items-center gap-1 text-(--color-accent)">
                            <span>{data.price}</span>
                        </div>
                    </div>
                )}
            </div>
        </li>
    );
};

export default Card;