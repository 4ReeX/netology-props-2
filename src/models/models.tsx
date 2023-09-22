export interface Item {
    listing_id: number, //уникальный идентификатор предложения, число;
    url: string, //ссылка на предложение, строка;
    MainImage: { //информация об изображении
        url_570xN: string, // для получения адреса главной картинки, строка
    },
    title: string, // название предложения, строка;
    currency_code: string, //код валюты, строка;
    price: string, //цена, строка;
    quantity: number //доступное количество, число.
}
export interface ListingProps {
    items: Item,
}
