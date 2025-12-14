import { Link, useLoaderData } from "react-router-dom";
import { siteConfig } from "../config/index";
import ProductList from "../components/productsList";
import type { Product } from "../types";
import { getProducts } from "../utils/fake-api";
import { loader } from "./dashboard/DashboardProducts";
import { Card, CardTitle, CardDescription, CardContent, CardImage } from "../components/Card";


export default function Products() {
    const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

    return (
        <div className="space-y-12">
            <header>
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl">Shop Products</h1>
                    <p className="text-lg">shop our NIGHTMARES</p>
                </div>
            </header>
            <section>
                {products.length ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Card key={product.id}>
                                <CardImage>
                                    <Link to={`/products/${product.id}`}>
                                        <img src={product.imageUrl} className="object-cover aspect-square rounded-t-lg" />
                                    </Link>
                                </CardImage>
                                <CardContent>
                                    <CardTitle>
                                        <Link to={`/products/${product.id}`}>{product.title}</Link>
                                    </CardTitle>
                                    <CardDescription>{product.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="bg-gray-50 border text-gray-500 p-6 rounded-lg">no products found</p>
                )}
            </section>
        </div>
    );
}
