import { Form, redirect, useActionData } from "react-router-dom";
import { siteConfig } from "../../config";
import { addProduct } from "../../utils/fake-api";
import { isValidUrl, isValidPrice } from "../../utils";

export async function action({ request }: { request: Request }) {
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
            errors.title = 'product title must contain more than 2 characters'
        } else if (!isValidUrl(imageUrl)) {
            errors.imageUrl = 'product must have a valid image URL'
        } else if (!isValidPrice(price)) {
            errors.price = 'please enter a valid price'
        }

        if (Object.keys(errors).length) {
            return { errors };
        }

        await addProduct({
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

export default function DashboardNewProduct() {
    const actionData = useActionData() as { errors: { [key: string]: string } };
    const { errors } = actionData ?? {};

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
                </label>
                <label className="flex flex-col space-y-1">
                    <span className="font-medium">Image URL</span>
                    <input
                        type="text"
                        name="imageUrl"
                        required
                        className="border p-2 rounded"
                    />
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
