import type { ParamParseKey, Params } from 'react-router-dom';
import { useLoaderData, Navigate, Form, useNavigation } from 'react-router-dom';
import type { Product } from '../../types';
import { getProduct } from '../../utils/fake-api';

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
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  if (!product) {
    return <Navigate to="/dashboard/products" replace />;
  }

  return (
    <section className="min-h-screen bg-white text-black px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mt-16 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

        <h1 className="text-4xl mt-16 md:text-6xl font-black tracking-tight leading-tight mb-6">{product.title}</h1>

        <p className="text-lg md:text-xl text-neutral-700 mb-12 max-w-2xl">{product.description}</p>

        <div className="mb-16">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-w-md rounded-lg border border-neutral-200"
          />
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-neutral-700 mb-16">
          <div>
            <dt className="text-sm uppercase tracking-wide text-neutral-500">Brand</dt>
            <dd className="font-medium text-black">{product.brand}</dd>
          </div>

          <div>
            <dt className="text-sm uppercase tracking-wide text-neutral-500">Category</dt>
            <dd className="font-medium text-black">{product.category}</dd>
          </div>

          <div>
            <dt className="text-sm uppercase tracking-wide text-neutral-500">Price</dt>
            <dd className="font-medium text-black">£{product.price}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-4">
          <Form action="edit">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded hover:bg-teal-500 transition disabled:opacity-50"
            >
              Edit Product
            </button>
          </Form>

          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Are you sure you want to delete this product?')) {
                event.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-500 transition disabled:opacity-50"
            >
              Delete Product
            </button>
          </Form>
        </div>

        <div className="mt-20 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>
      </div>
    </section>
  );
}
