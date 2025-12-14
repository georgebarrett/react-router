import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function Layout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return ( 
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className={`container mx-auto py-24 ${
                isLoading ? 'opacity-25' : 'opacity-100'
            }`}>
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}
