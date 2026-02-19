import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Layout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

    return ( 
        <main className="flex flex-col min-h-screen">
            {isLoading && <Spinner />}
            <Header />
            <div className={`${isLoading ? 'opacity-25' : ''}`}>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </main>
    );
}
