import { Link } from "react-router-dom";
import type { Product } from "../types";

type Props = {
    product: Product
};

export default function ProductCard({ product }: Props) {
    return (
        <article className="border rounded-lg p-3 space-y-4 shadow-lg">
            <div className="relative aspect-square">
                <Link to={`/dashboard/products/${product.id}`}>
                    <img
                        src={product.imageUrl}
                        className="object-cover aspect-square rounded-t-lg"
                    />
                </Link>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-medium">
                    <Link to={`/dashboard/products/${product.id}`}>{product.title}</Link>
                </h3>
                <p className="text-sm">{product.description}</p>
            </div>
        </article>
    );
}