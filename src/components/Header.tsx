import { Link, NavLink } from "react-router-dom";
import { siteConfig } from '../config/index';
import { useUser, UserButton } from "@clerk/clerk-react";
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";

export default function Header() {
  const { isSignedIn } = useUser();
  const isAdmin = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block text-sm tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-teal-600"
        : "text-neutral-700 hover:text-teal-600"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
            <Link to="/">
                <h1 className="text-lg md:text-xl font-black tracking-[0.2em] text-black uppercase">
                    {siteConfig.name}
                </h1>
            </Link>

        <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/about" className={getNavLinkClasses}>
                About
            </NavLink>
            <NavLink to="/products" className={getNavLinkClasses}>
                Products
            </NavLink>

            {isSignedIn && isAdmin && (
                <NavLink to="/dashboard" className={getNavLinkClasses}>
                    Dashboard
                </NavLink>
            )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
                <UserButton />
            ) : (
                <NavLink
                    to="/sign-in"
                    className="px-4 py-1.5 text-sm font-medium text-black bg-teal-400 rounded hover:bg-teal-300 transition"
                >
                    Sign-in
                </NavLink>
            )}
        </div>

        <button
            className="md:hidden text-black text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
        >
            ☰
        </button>
      </div>

        {isOpen && (
            <div className="md:hidden bg-white border-t border-neutral-200 px-6 py-4 space-y-4">
                <NavLink
                    to="/about"
                    className={getNavLinkClasses}
                    onClick={() => setIsOpen(false)}
                >
                    About
                </NavLink>

                <NavLink
                    to="/products"
                    className={getNavLinkClasses}
                    onClick={() => setIsOpen(false)}
                >
                    Products
                </NavLink>

                {isSignedIn && isAdmin && (
                    <NavLink
                        to="/dashboard"
                        className={getNavLinkClasses}
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                )}

                {!isSignedIn && (
                    <NavLink
                        to="/sign-in"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded hover:bg-teal-500 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Sign-in
                    </NavLink>
                )}
            </div>
        )}
    </header>
  );
}