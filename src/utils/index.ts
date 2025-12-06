export function isValidPrice(price: string) {
    return price.match(/^\d+(\.\d{1, 2})?$/);
}

