import { Link } from "react-router-dom";

export default function DashboardIndex() {
  return (
    <section className="min-h-screen bg-white text-black px-6 py-20">
      <div className="max-w-5xl mx-auto">

        <div className="mt-16 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>

        <header className="mb-12 mt-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-neutral-600 tracking-wide uppercase">
            Store Control Centre
          </p>
        </header>

        <div className="mb-16">
          <p className="text-xl md:text-2xl font-medium leading-relaxed text-neutral-800">
            Welcome to the epicentre of electronic music hardware.
          </p>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Manage products. Shape the catalogue. Curate the machines that
            power live sets, studio sessions, and late-night experiments.
          </p>
        </div>

        <Link
            to="/dashboard/products"
            className="block border border-neutral-200 rounded-lg p-6 hover:shadow-md hover:border-teal-500 transition group"
            >
            <p className="text-sm uppercase tracking-wide text-neutral-500">
                Edit Products
            </p>
        </Link>

        <div className="mt-20 w-32 h-[2px] bg-gradient-to-r from-teal-600 to-transparent"></div>
      </div>
    </section>
  );
}
