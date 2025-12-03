import { Link } from "react-router-dom";
import { siteConfig } from '../config/index';

export default function Header() {
    return (
        <header className="sticky w-full border-b shadow-sm backdrop-blur">
            <div className="container flex items-center justify-between h-14 mx-auto">
                <div className="flex items-center space-x-6 md:gap-10">
                    <Link to="/">
                        <h1 className="font-bold">{siteConfig.name}</h1>
                    </Link>
                    <nav>
                        <Link to="/about">About</Link>
                    </nav>
                </div>
                <div className="ml-6">
                    <Link to='/dashboard'>Dashboard</Link>
                </div>
            </div>
        </header>
    );
}
