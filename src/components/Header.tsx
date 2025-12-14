import { Link, NavLink } from "react-router-dom";
import { siteConfig } from '../config/index';

export default function Header() {
    const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
        return isActive ? 'font-semibold underline' : '';
    }

    return (
        <header className="sticky w-full border-b shadow-sm backdrop-blur">
            <div className="container flex items-center h-14 mx-auto">
                <div className="flex items-center space-x-6 md:gap-10">
                    <Link to="/">
                        <h1 className="font-bold">{siteConfig.name}</h1>
                    </Link>
                    <nav className="flex items-center space-x-6">
                        <NavLink to="/about" className={getNavLinkClasses}>About</NavLink>
                        <NavLink to='/products' className={getNavLinkClasses}>Products</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}
