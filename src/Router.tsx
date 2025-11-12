import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import DashboardLayout from "./components/Dashboard";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import DashboardProducts from "./pages/dashboard/DashboardProducts";


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
                path: '*',
                element: <NotFound />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardLayout />
            },
            {
                path: 'dashboard',
                element: <DashboardIndex />
            },
            {
                path: 'products',
                element: <DashboardProducts />
            }
        ]
    }
]);

export { router };
