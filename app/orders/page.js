"use client";
import { useState, useEffect } from "react";
import { getOrders } from "../../lib/api";
import DataTable from "../../components/DataTable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-20">Loading orders...</div>;

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Orders</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <DataTable headers={["ID", "Customer", "Total", "Date"]}>
        {orders.map((o) => (
          <tr key={o.id} className="hover:bg-gray-50">
            <td>#{o.id}</td>
            <td>{o.customerName}</td>
            <td>${o.total}</td>
            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
