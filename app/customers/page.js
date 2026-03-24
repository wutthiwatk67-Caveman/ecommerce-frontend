"use client";
import { useState, useEffect } from "react";
import { getCustomers, createCustomer } from "../../lib/api";
import DataTable from "../../components/DataTable";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      await createCustomer(form);
      setForm({ name: "", email: "", phone: "" });
      fetchCustomers();
    } catch {
      setError("Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return <div className="text-center py-20">Loading customers...</div>;

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Customers</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <div className="card mb-10">
        <h2 className="text-xl font-medium mb-4">Add New Customer</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded-2xl px-5 py-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded-2xl px-5 py-3"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border border-gray-300 rounded-2xl px-5 py-3"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white py-3 rounded-2xl font-medium hover:bg-blue-700 md:col-span-3"
          >
            {submitting ? "Creating..." : "Add Customer"}
          </button>
        </form>
      </div>

      <DataTable headers={["ID", "Name", "Email", "Phone"]}>
        {customers.map((c) => (
          <tr key={c.id} className="hover:bg-gray-50">
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone || "-"}</td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
