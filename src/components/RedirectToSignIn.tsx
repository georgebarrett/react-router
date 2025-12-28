import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { RedirectToSignIn, SignedOut, SignedIn, SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ClerkProviderLayout from './ClerkProviderLayout';
import Layout from './Layout';
import ErrorPage from '../pages/Error';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import About from '../pages/About';
import DashboardLayout from './Dashboard';
import './index.css';
import Products, { loader as productsLoader } from '../pages/Products';
import SingleProduct, { SingleProductAction } from '../pages/SingleProduct';
import DashboardIndex from '../pages/dashboard/DashboardIndex';
import DashboardProducts, { loader as dashboardProductsLoader } from '../pages/dashboard/DashboardProducts';
import DashboardProduct, { loader as dashboardProductLoader } from '../pages/dashboard/DashboardProduct';
import DashboardNewProduct, { action as dashboardNewProductAction } from '../pages/dashboard/DashboardNewProduct';
import DashboardEditProduct, { action as dashboardEditProductAction } from '../pages/dashboard/DashboardEditProduct';
import { action as dashboardDestroyAction } from '../pages/dashboard/DashboardDestroyProduct';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route element={<ClerkProviderLayout />}>
//             <Route path="/" element={<Layout />}>
//                 <Route errorElement={<ErrorPage />}>
//                     <Route index element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/products" element={<Products />} loader={productsLoader} />
//                     <Route path="/products/:productId" element={<SingleProduct />} loader={dashboardProductLoader} />
//                     <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
//                     <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
//                     <Route path="*" element={<NotFound />} />
//                 </Route>
//             </Route>
//             <Route path="/dashboard">
//                 <Route
//                     element={
//                         <>
//                             <SignedIn>
//                                 <DashboardLayout />
//                             </SignedIn>
//                             <SignedOut>
//                                 <RedirectToSignIn />
//                             </SignedOut>
//                         </>
//                     }
//                 >
//                     <Route errorElement={<ErrorPage />}>
//                         <Route index element={<DashboardIndex />} />
//                         <Route path="/products" loader={dashboardProductLoader} element={<DashboardProducts />} />
//                         <Route path="products/new" action={DashboardNewProduct} element={<DashboardNewProduct />} />
//                         <Route path="products/:productId" loader={dashboardProductLoader} element={<DashboardProduct />} />
//                         <Route path="products/:productId/edit" loader={dashboardProductLoader} action={DashboardEditProduct} element={<DashboardEditProduct />} />
//                         <Route path="products/:productId/destroy" action={dashboardDestroyAction} />
//                     </Route>
//                 </Route>
//             </Route>
//         </Route>
//     )
// );

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// )
