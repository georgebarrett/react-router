import { Form, Link, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { getProducts } from '../utils/fake-api';
import type { Product } from '../types';
import { useEffect, useRef, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import Spinner from '../components/Spinner';
import { Card, CardTitle, CardDescription, CardContent, CardImage } from '../components/Card';

export async function loader({ request }: { request: Request }): Promise<{ products: Product[]; q: string }> {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') ?? '';

  const normalisedQ = q.trim().toLowerCase();

  const products = await getProducts(normalisedQ);

  return { products, q };
}

export default function Products() {
  const { products, q } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const submit = useSubmit();
  const navigation = useNavigation();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [search, setSearch] = useState(q);

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const isSearching =
    (navigation.state === 'submitting' ||
      navigation.state === 'loading') &&
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  const onChange = useCallback(
    debounce((form: HTMLFormElement | null) => {
      if (!form) return;

      const isFirstSearch = q.length === 0;

      submit(form, {
        replace: isFirstSearch,
      });
    }, 500),
    [q, submit]
  );

  useEffect(() => {
    return () => {
      onChange.cancel();
    };
  }, [onChange]);

  return (
    <section className="min-h-screen bg-white text-black px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <div className="mt-16 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

        <h1 className="text-4xl mt-16 md:text-6xl font-black tracking-tight leading-tight mb-10">
          Shop Products
        </h1>

        <p className="text-lg md:text-xl text-neutral-700 mb-12">
          Expert knob twiddlers encouraged.
        </p>

        <Form
          method="get"
          ref={formRef}
          role="search"
          className="flex items-center gap-4 mb-16"
        >
          <input
            placeholder="Search products..."
            type="search"
            name="q"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onChange(e.currentTarget.form);
            }}
            readOnly={isSearching}
            className="w-full md:w-1/3 border border-neutral-300 focus:border-teal-600 focus:ring-0 outline-none px-4 py-3 rounded transition"
          />
          {isSearching && <Spinner />}
        </Form>

        {products.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition">
                <CardImage>
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="object-cover aspect-square w-full rounded-t-lg"
                    />
                  </Link>
                </CardImage>
                <CardContent>
                  <CardTitle>
                    <Link
                      to={`/products/${product.id}`}
                      className="hover:text-teal-600 transition"
                    >
                      {product.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-neutral-600">
                    {product.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border border-neutral-200 rounded-lg p-8 text-neutral-500">
            No products found.
          </div>
        )}

        <div className="mt-20 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

      </div>
    </section>
  );
}