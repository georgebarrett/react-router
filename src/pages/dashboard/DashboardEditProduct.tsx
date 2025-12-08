import { Form, redirect, useActionData, useLoaderData, Navigate } from "react-router-dom";
import { siteConfig } from "../../config";
import { addProduct } from "../../utils/fake-api";
import { loader } from "./DashboardProduct"; 

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
                <h1 className="font-bold text-3xl md:text-4xl">new nightmare</h1>
                <p className="text-lg">create a new nightmare</p>
            </header>

            {errors?.form && <div className="font-bold text-3xl md:text-4xl">{errors?.form}</div>}

            <Form method="post" className="space-y-6">
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">nightmare title</span>
                    <input
                        type="text"
                        name="title"
                        required
                        className="border p-2 rounded"
                    />
                    {errors?.title && <p className="text-red-800 text-sm">{errors.title}</p>}
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">nightmare description</span>
                    <textarea name="description" className="border p-2 rounded" />
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">price</span>
                    <input
                        type="text"
                        name="price"
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
                        required
                        className="border p-2 rounded"
                    />
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">category</span>
                    <input
                        type="text"
                        name="category"
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
                        required
                        className="border p-2 rounded"
                    />
                    {errors?.imageUrl && <p className="text-red-800 text-sm">{errors.imageUrl}</p>}
                </label>
                <div>
                    <button
                        type="submit"
                        className="bg-black hover:bg-gray-800 px-4 py-2 rounded text-white"
                    >
                        save
                    </button>
                </div>
            </Form>
        </div>
    );
}
