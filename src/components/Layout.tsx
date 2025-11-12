import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";

export default function Layout() {
    return ( 
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="container mx-auto py-24">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}
