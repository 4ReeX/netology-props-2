import React, { useEffect, useState } from 'react';
import { Item } from '../models/models';
import itemsData from '../data/etsy.json';

const Listing: React.FC = () => {
    const [shopData, setShopData] = useState<Item[]>([]);


    useEffect(() => {
        const jsonData: Item[] = JSON.parse(JSON.stringify(itemsData));

        // Маппинг данных согласно модели Item
        const mappedData: Item[] = jsonData.map((item) => ({
            listing_id: item.listing_id,
            url: item.url,
            MainImage: {
                url_570xN: item.MainImage?.url_570xN,
            },
            title: item.title,
            currency_code: item.currency_code,
            price: item.price,
            quantity: item.quantity,
        }));
        setShopData(mappedData);
    }, []);

    const formatPrice = (price: string, currency_code: string) => {
        switch (currency_code) {
            case 'USD':
                return `$${parseFloat(price).toFixed(2)}`;
            case 'EUR':
                return `€${parseFloat(price).toFixed(2)}`;
            default:
                return `${parseFloat(price).toFixed(2)} ${currency_code}`;
        }
    };
    const getQuantityLevelClass = (quantity: number) => {
        if (quantity <= 10) {
            return 'level-low';
        } else if (quantity <= 20) {
            return 'level-medium';
        } else {
            return 'level-high';
        }
    };
    
    return (
        <div className="item-list">
            {shopData.map((item, index) => (
                <div className="item" key={index}>
                    <div className="item-image">
                        <a href={item.url}>
                            <img src={item.MainImage.url_570xN} alt={item.title} />
                        </a>
                    </div>
                    <div className="item-details">
                        <p className="item-title">
                            {item.title && item.title.length > 50 ? `${item.title.slice(0, 50)}…` : item.title}
                        </p>
                        <p className="item-price">
                            {formatPrice(item.price, item.currency_code)}
                        </p>
                        <p className={`item-quantity ${getQuantityLevelClass(item.quantity)}`}>
                            {item.quantity} left
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Listing;
