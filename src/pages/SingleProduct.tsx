import type { ParamParseKey, Params } from "react-router-dom";
import { useLoaderData, Navigate, useFetcher } from "react-router-dom";
import { siteConfig } from "../config/index";
import { loader } from "./dashboard/DashboardProduct";
import { editProduct } from "../utils/fake-api";

const path = 'products/:productId';

export async function action({
    request,
    params: { productId }
} : {
    request: Request;
    params: Params<ParamParseKey<typeof path>>;
}) {
    if (!productId) {
        throw new Error('product not found');
    }

    try {
        const formData = await request.formData();
        const isInWishList = formData.get('wishlist') === 'true';

        return editProduct(productId, { isInWishList });
    } catch (e) {
        const error = 'an error occurred. please try again later';
        return { error };
    }
}

export default function SingleProduct() {
    const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;

    if (!product) {
        return <Navigate to='/products' replace={true} />;
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
