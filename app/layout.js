import "./globals.css";
import Link from "next/link";
import { Home, Users, Package, ShoppingCart, Plus } from "lucide-react";

export const metadata = {
  title: "E-Commerce Admin",
  description: "Next.js 15 Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <h1 className="font-semibold text-2xl tracking-tight">
                Ecom Admin
              </h1>
            </div>

            <div className="flex gap-8 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Home size={18} /> Dashboard
              </Link>
              <Link
                href="/customers"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Users size={18} /> Customers
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <Package size={18} /> Products
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <ShoppingCart size={18} /> Orders
              </Link>
              <Link
                href="/create-order"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-2xl hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Create Order
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-8 py-10">{children}</main>
      </body>
    </html>
  );
}
