import type { ParamParseKey, Params } from "react-router-dom";
import { useLoaderData, Navigate, Form } from "react-router-dom";
import { siteConfig } from "../../config";
import type { Product } from "../../types";
import { getProduct } from "../../utils/fake-api";
import { loader } from "./dashboard/DashboardProduct";


export default function SingleProduct() {
    const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;

    if (!product) {
        return <Navigate to='/dashboard/products' replace={true} />;
    }

    return (
        <div className="space-y-12">
            <header className="space-y-2">
                <h1 className="font-bold text-3xl md:text-4xl">{product.title}</h1>
                <p className="text-lg">{product.description}</p>
            </header>
            <aside>
                <img src={product.imageUrl} />
            </aside>
            <section>
                <dl className="space-y-4">
                    <div>
                        <dt className="font-medium">brand</dt>
                        <dd>{product.brand}</dd>
                    </div>
                    <div>
                        <dt className="font-medium">category</dt>
                        <dd>{product.category}</dd>
                    </div>
                    <div>
                        <dt className="font-medium">price</dt>
                        <dd>{product.price}</dd>
                    </div>
                </dl>
            </section>
        </div>
    );
}
