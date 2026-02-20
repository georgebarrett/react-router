import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { addProduct } from '../../utils/fake-api';
import { isValidUrl, isValidPrice } from '../../utils';

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
      errors.title = 'product title must contain more than 2 characters';
    } else if (!isValidUrl(imageUrl)) {
      errors.imageUrl = 'product must have a valid image URL';
    } else if (!isValidPrice(price)) {
      errors.price = 'please enter a valid price';
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
      imageUrl,
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

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section className="min-h-screen bg-white text-black px-6 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Top Accent */}
        <div className="mt-16 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

        {/* Heading */}
        <h1 className="text-4xl mt-16 md:text-6xl font-black tracking-tight leading-tight mb-6">New Hardware</h1>

        <p className="text-lg md:text-xl text-neutral-700 mb-12">Add a new piece of kit to the Syntheads catalogue.</p>

        {/* Form Error */}
        {errors?.form && (
          <div className="mb-10 p-4 border border-red-300 bg-red-50 text-red-700 rounded">{errors.form}</div>
        )}

        {/* Form */}
        <Form method="post" className="space-y-10">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-wide text-neutral-500">Hardware Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full border border-neutral-300 px-4 py-3 rounded focus:border-teal-600 focus:ring-0 outline-none transition"
            />
            {errors?.title && <p className="text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-wide text-neutral-500">Description</label>
            <textarea
              name="description"
              rows={4}
              className="w-full border border-neutral-300 px-4 py-3 rounded focus:border-teal-600 focus:ring-0 outline-none transition"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-wide text-neutral-500">Price</label>
            <input
              type="text"
              name="price"
              required
              className="w-full border border-neutral-300 px-4 py-3 rounded focus:border-teal-600 focus:ring-0 outline-none transition"
            />
            {errors?.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-wide text-neutral-500">Brand</label>
            <input
              type="text"
              name="brand"
              required
              className="w-full border border-neutral-300 px-4 py-3 rounded focus:border-teal-600 focus:ring-0 outline-none transition"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-wide text-neutral-500">Category</label>
            <input
              type="text"
              name="category"
              required
              className="w-full border border-neutral-300 px-4 py-3 rounded focus:border-teal-600 focus:ring-0 outline-none transition"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-wide text-neutral-500">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              required
              className="w-full border border-neutral-300 px-4 py-3 rounded focus:border-teal-600 focus:ring-0 outline-none transition"
            />
            {errors?.imageUrl && <p className="text-sm text-red-600">{errors.imageUrl}</p>}
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-8 py-3 bg-teal-600 text-white font-medium rounded hover:bg-teal-500 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </Form>

        {/* Bottom Accent */}
        <div className="mt-20 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>
      </div>
    </section>
  );
}
