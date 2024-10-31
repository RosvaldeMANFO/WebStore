export interface Cart {
    items: CartItem[];
    total: number;
}

export interface CartItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    id: number;
}