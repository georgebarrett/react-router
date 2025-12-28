import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function DashboardLayout() {
    return (
        <main className="relative flex min-h-screen flex-col">
            <Header />
            <section className="container mx-auto">
                <div className="my-12 grid gap-12 md:grid-cols-[200px_1fr]">
                    <nav className="space-y-3 md:w-[200px]">
                        <h2 className="text-lg font-semibold ">Dashboard Menu</h2>
                        <ul className="space-y-3">
                            <li>
                                <Link to='/dashboard/products' className="underline">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard' className="underline">
                                    Back to Dashboard
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}