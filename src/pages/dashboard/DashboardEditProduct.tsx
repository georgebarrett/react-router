import { Form, redirect, useActionData, useLoaderData, Navigate } from "react-router-dom";
import type { Params, ParamParseKey } from "react-router-dom";
import { siteConfig } from "../../config";
import { editProduct } from "../../utils/fake-api";
import { loader } from "./DashboardProduct";
import { isValidUrl } from "../../utils";

const path = 'dashboard/products/:productId/edit';

export async function action({
    request,
    params: { productId },
}: {
    request: Request;
    params: Params<ParamParseKey<typeof path>>;
}) {
    if (!productId) {
        throw new Error('Sorry, Product not found.')
    }

    const errors: { [key: string]: string } = {};

    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const brand = formData.get('brand') as string;
        const category = formData.get('category') as string;
        const imageUrl = formData.get('imageUrl') as string;

        if (typeof title !== 'string' || title.length < 2) {
            errors.title = 'product title must contain more than one character'
        } else if (!price.match(/^\d+(\.\d{1,2})?$/)) {
            errors.price = 'please enter a valid price'
        } else if (!isValidUrl(imageUrl)) {
            errors.price = 'please enter a valid image url'
        }

        if (Object.keys(errors).length) {
            return { errors };
        }

        await editProduct(productId, {
            title,
            description,
            price: parseFloat(price),
            brand,
            category,
            imageUrl
        });

        return redirect(`/dashboard/products`);
    
    } catch (e) {
        errors.form = 'nightmare creation failed. please try again later';
        return { errors };
    }
}

export default function DashboardEditProduct() {
    const product = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    const actionData = useActionData() as { errors: { [key: string]: string } };

    const { errors } = actionData ?? {};

    if (!product) {
        return <Navigate to="/dashboard/products" replace={true} />
    }

    return (
        <div className="space-y-12">
            <header>
                <h1 className="font-bold text-3xl md:text-4xl">edit nightmare</h1>
                <p className="text-lg">edit nightmare details</p>
            </header>

            {errors?.form && <div className="font-bold text-3xl md:text-4xl">{errors?.form}</div>}

            <Form method="post" className="space-y-6">
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">nightmare title</span>
                    <input
                        type="text"
                        name="title"
                        defaultValue={product.title}
                        required
                        className="border p-2 rounded"
                    />
                    {errors?.title && <p className="text-red-800 text-sm">{errors.title}</p>}
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">nightmare description</span>
                    <textarea name="description" defaultValue={product.description} className="border p-2 rounded" />
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">price</span>
                    <input
                        type="text"
                        name="price"
                        defaultValue={product.price}
                        required
                        className="border p-2 rounded"
                    />
                    {errors?.price && <p className="text-red-800 text-sm">{errors.price}</p>}
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">brand</span>
                    <input 
                        type="text"
                        name="brand"
                        defaultValue={product.brand}
                        required
                        className="border p-2 rounded"
                    />
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">category</span>
                    <input
                        type="text"
                        name="category"
                        defaultValue={product.category}
                        required
                        className="border p-2 rounded"
                    />
                    {errors?.category && <p className="text-red-800 text-sm">{errors.category}</p>}
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">Image URL</span>
                    <input
                        type="text"
                        name="imageUrl"
                        defaultValue={product.imageUrl}
                        required
                        className="border p-2 rounded"
                    />
                    {errors?.imageUrl && <p className="text-red-800 text-sm">{errors.imageUrl}</p>}
                </label>
                <div>
                    <button
                        type="submit"
                        className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
                        disabled={isSubmitting}
                    >
                        save
                    </button>
                </div>
            </Form>
        </div>
    );
}
