import { Form, Link, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { siteConfig } from '../config/index';
import ProductList from '../components/productsList';
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
  const { products, q } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const submit = useSubmit();
  const navigation = useNavigation();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [search, setSearch] = useState(q);

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const isSearching =
    (navigation.state === 'submitting' || navigation.state === 'loading') &&
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  const onChange = useCallback(
    debounce((form: HTMLFormElement | null) => {
      if (!form) return;

      const isFirstSearch = q.length === 0;

      submit(form, {
        replace: isFirstSearch
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
    <div className="space-y-12">
      <header>
        <div>
          <h1 className="font-bold text-3xl md:text-4xl">Shop Products</h1>
          <p className="text-lg">shop our NIGHTMARES</p>
        </div>
      </header>
      <section>
        <Form method="get" ref={formRef} role="search" className="flex items-center space-x-4">
          <input
            placeholder="search products..."
            type="search"
            name="q"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onChange(formRef.current);
            }}
            readOnly={isSearching}
            className="border outline-none p-2 rounded w-full md:w-1/4"
          />
          <div className={isSearching ? '' : 'hidden'}>
            <Spinner />
          </div>
        </Form>
      </section>
      <section>
        {products.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardImage>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="object-cover aspect-square rounded-t-lg" />
                  </Link>
                </CardImage>
                <CardContent>
                  <CardTitle>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="bg-gray-50 border text-gray-500 p-6 rounded-lg">no products found</p>
        )}
      </section>
    </div>
  );
}
