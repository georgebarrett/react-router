import { Link, useLoaderData } from "react-router-dom";
import { siteConfig } from "../config/index";
import ProductList from "../components/productsList";
import type { Product } from "../types";
import { getProducts } from "../utils/fake-api";

export async function loader(): Promise<{ products: Product[] }> {
    const products = await getProducts();
    return { products };
}

export default function DashboardProducts() {
    const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

    return (
        <div className="space-y-12">
            <header>
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl">Shop Products</h1>
                    <p className="text-lg">shop our NIGHTMARES</p>
                </div>
            </header>
            <ProductList products={products} />
        </div>
    );
}
