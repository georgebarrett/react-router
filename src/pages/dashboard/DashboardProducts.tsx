import { Link, useLoaderData } from "react-router-dom";
import { siteConfig } from "../../config";
import ProductList from "../../components/productsList";
import type { Product } from "../../types";
import { getProducts } from "../../utils/fake-api";

export async function loader(): Promise<{ products: Product[] }> {
    const products = await getProducts();
    return { products };
}

export default function DashboardProducts() {
    const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

    return (
        <div className="space-y-12">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl">Products</h1>
                    <p className="text-lg">Listing of NIGHTMARES</p>
                </div>
                <Link
                    to='/dashbaord/products/new'
                    className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
                >
                    add new
                </Link> 
            </header>
            <ProductList products={products} />
        </div>
    );
}
