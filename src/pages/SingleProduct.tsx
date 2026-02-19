import type { ParamParseKey, Params } from "react-router-dom";
import { useLoaderData, Navigate, useFetcher, useNavigate } from "react-router-dom";
import { loader } from "./dashboard/DashboardProduct";
import { editProduct } from "../utils/fake-api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import type { MouseEvent } from "react";

const path = 'products/:productId';

export async function SingleProductAction({
    request,
    params: { productId }
} : {
    request: Request;
    params: Params<ParamParseKey<typeof path>>;
}) {
    if (!productId) {
        throw new Error('product not found');
    }

    // toast test
    // return { error: 'drip' };

    try {
        const formData = await request.formData();
        const isInWishList = formData.get('wishlist') === 'true';

        return editProduct(productId, { isInWishList });
    } catch (e) {
        return { error: 'an error occurred. please try again later' };
    }
}

export default function SingleProduct() {
    const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    if (!product) {
        return <Navigate to='/products' replace={true} />;
    }

    const isSubmitting = fetcher.state === 'submitting';
    let isInWishlist = product.isInWishList;
    if (fetcher.formData && !fetcher.data?.error) {
        isInWishlist = fetcher.formData.get('wishlist') === 'true';
    }

    const { data } = fetcher;
    
    useEffect(() => {
        if (data?.error) {
            toast.error(data.error, { toastId: 'error' });
        }
    }, [data?.error])

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (!isSignedIn) {
            e.preventDefault();
            navigate('sign-in');
        }
    };

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
            <section className="space-y-6">
                <fetcher.Form method='post'>
                    <input type="hidden" name="isSignedIn" value={`${isSignedIn}`} />
                    <button
                        name="wishlist"
                        type="submit"
                        value={isInWishlist ? 'false' : 'true'}
                        disabled={isSubmitting}
                        onClick={onClick}
                        className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
                    >
                        {isInWishlist ? 'remove from wishlist' : 'add to wishlist'}
                    </button>
                </fetcher.Form>
            </section>
        </div>
    );
}
