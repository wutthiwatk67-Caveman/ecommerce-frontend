"use client";
import { useEffect, useState } from "react";
import { getCustomers, getProducts, getOrders } from "../lib/api";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [c, p, o] = await Promise.all([
          getCustomers(),
          getProducts(),
          getOrders(),
        ]);
        setCounts({
          customers: c.length,
          products: p.length,
          orders: o.length,
        });
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-xl">Loading dashboard...</div>
    );
  if (error)
    return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-sm text-gray-500">Total Customers</div>
          <div className="text-6xl font-bold text-blue-600 mt-3">
            {counts.customers}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-6xl font-bold text-emerald-600 mt-3">
            {counts.products}
          </div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-6xl font-bold text-purple-600 mt-3">
            {counts.orders}
          </div>
        </div>
      </div>
    </div>
  );
}
