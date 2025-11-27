export type Product = {
    id: string,
    title: string,
    description?: string,
    price: number,
    brand: string,
    category: string,
    imageUrl: string,
    isInWishList?: boolean,
    createdAt: number
};

// when new products are created these fields can be removed as the backend will generate them
export type ProductDto = Omit<Product, 'id' | 'createdAt'>;

// for updating products. not every field has to be updated
export type EditProductDto = Partial<ProductDto>;
