import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import DashboardLayout from "./components/Dashboard";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import ErrorPage from "./pages/Error";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import FormsTest, { action as formsTestAction } from "./pages/FormsTest";
import DashboardProducts, {
    loader as DashboardProductsLoader
} from "./pages/dashboard/DashboardProducts";
import DashboardProduct, {
    loader as DashboardProductLoader
} from "./pages/dashboard/DashboardProduct";
import DashboardNewProduct, {
    action as DashboardNewProductAction
} from "./pages/dashboard/DashboardNewProduct";
import DashboardEditProduct, {
    action as DashboardEditProductAction
} from "./pages/dashboard/DashboardEditProduct";
import { action as destroyAction } from './pages/dashboard/DashboardDestroyProduct';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'products',
                element: <Products />,
                loader: DashboardProductLoader 
            },
            {
                path: 'products/:productId',
                element: <SingleProduct />,
                loader: DashboardProductLoader
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <DashboardIndex />
                    },
                    {
                        path: 'products',
                        element: <DashboardProducts />,
                        loader: DashboardProductsLoader,
                    },
                    {
                        path: 'products/new',
                        element: <DashboardNewProduct />,
                        action: DashboardNewProductAction
                    },
                    {
                        path: 'products/:productId',
                        element: <DashboardProduct />,
                        loader: DashboardProductLoader,
                    },
                    {
                        path: 'products/:productId/edit',
                        element: <DashboardEditProduct />,
                        loader: DashboardProductLoader,
                        action: DashboardEditProductAction
                    },
                    {
                        path: 'products/:productId/destroy',
                        action: destroyAction
                    }
                ]
            }
        ]
    },
    {
        path: '/forms-test',
        element: <FormsTest />,
        action: formsTestAction
    }
]);

export { router };
