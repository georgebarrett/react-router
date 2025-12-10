import type { ParamParseKey, Params } from "react-router-dom";
import { useLoaderData, Navigate, Form } from "react-router-dom";
import { siteConfig } from "../../config";
import type { Product } from "../../types";
import { getProduct } from "../../utils/fake-api";

const path = 'dashboard/products/:productId';

export async function loader({
    params: { productId },
}: {
    params: Params<ParamParseKey<typeof path>>;
}): Promise<Product | null> {
    if (productId) {
        return getProduct(productId);
    }

    return null;
}

export default function DashboardProduct() {
    const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;

    if (!product) {
        return <Navigate to='/dashbaord/products' replace={true} />;
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
            <section className="flex items-center space-x-2">
                <Form action="edit">
                    <button type="submit" className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white">
                        edit
                    </button>
                </Form>
                <Form
                    method="post"
                    action="destroy"
                    onSubmit={(event) => {
                        if (!confirm('are you sure you want to delete this product')) {
                            event.preventDefault();
                        }
                    }}
                />
                    <button type="submit" className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
                        delete
                    </button>
                <Form/>
            </section>
        </div>
    );
}
