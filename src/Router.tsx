import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { RedirectToSignIn, SignedOut, SignedIn, SignIn, SignUp } from '@clerk/clerk-react';
import ClerkProviderLayout from './components/ClerkProviderLayout';
import Layout from './components/Layout';
import ErrorPage from './pages/Error';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import About from './pages/About';
import DashboardLayout from './components/Dashboard';
import Products, { loader as productsLoader } from './pages/Products';
import SingleProduct, { SingleProductAction } from './pages/SingleProduct';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import DashboardProducts, { loader as dashboardProductsLoader } from './pages/dashboard/DashboardProducts';
import DashboardProduct, { loader as dashboardProductLoader } from './pages/dashboard/DashboardProduct';
import DashboardNewProduct, { action as dashboardNewProductAction } from './pages/dashboard/DashboardNewProduct';
import DashboardEditProduct, { action as dashboardEditProductAction } from './pages/dashboard/DashboardEditProduct';
import { action as dashboardDestroyAction } from './pages/dashboard/DashboardDestroyProduct';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ClerkProviderLayout />}>
      {/* Public site routes */}
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="products" element={<Products />} loader={productsLoader} />

        <Route
          path="products/:productId"
          element={<SingleProduct />}
          loader={dashboardProductLoader}
          action={SingleProductAction}
        />

        <Route path="sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route
        path="dashboard"
        element={
          <>
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
        errorElement={<ErrorPage />}
      >
        <Route index element={<DashboardIndex />} />

        <Route path="products" element={<DashboardProducts />} loader={dashboardProductsLoader} />

        <Route path="products/new" element={<DashboardNewProduct />} action={dashboardNewProductAction} />

        <Route path="products/:productId" element={<DashboardProduct />} loader={dashboardProductLoader} />

        <Route
          path="products/:productId/edit"
          element={<DashboardEditProduct />}
          loader={dashboardProductLoader}
          action={dashboardEditProductAction}
        />

        <Route path="products/:productId/destroy" action={dashboardDestroyAction} />
      </Route>
    </Route>,
  ),
);

export { router };
