import type { Product } from "../types";
import ProductCard from "./productCard";

type props = {
    products: Product[]
};

export default function productList({ products }: props) {
    return (
        <>
            {products.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="bg-gray-50 border text-gray-500 p-6 rounded-lg">
                    no products found
                </p>
            )}
        </>
    );
}
