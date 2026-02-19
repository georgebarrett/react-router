import { Link, useLoaderData } from 'react-router-dom';
import ProductList from '../../components/productsList';
import type { Product } from '../../types';
import { getProducts } from '../../utils/fake-api';

export async function loader(): Promise<{ products: Product[] }> {
  const products = await getProducts();
  return { products };
}

export default function DashboardProducts() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <section className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mt-5 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

        <header className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Products</h1>
            <p className="text-lg text-neutral-600 uppercase tracking-wide">Synths & Drum Machines</p>
          </div>

          <Link
            to="/dashboard/products/new"
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded hover:bg-teal-500 transition"
          >
            + Add New
          </Link>
        </header>

        <div className="h-px bg-neutral-200 mb-12"></div>

        <div className="space-y-6">
          {products.length === 0 ? (
            <p className="text-neutral-500 text-lg">No products yet. Start building the catalogue.</p>
          ) : (
            <ProductList products={products} />
          )}
        </div>

        <div className="mt-20 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>
      </div>
    </section>
  );
}
