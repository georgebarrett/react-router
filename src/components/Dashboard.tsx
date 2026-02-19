import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function DashboardLayout() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-24 w-full">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
