"use client";
import { useState, useEffect } from "react";
import { getProducts, createProduct } from "../../lib/api";
import DataTable from "../../components/DataTable";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createProduct({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      setForm({ name: "", price: "", stock: "" });
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading)
    return <div className="text-center py-20">Loading products...</div>;

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Products</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">
          {error}
        </div>
      )}

      <div className="card mb-10">
        <h2 className="text-xl font-medium mb-4">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
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
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-gray-300 rounded-2xl px-5 py-3"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border border-gray-300 rounded-2xl px-5 py-3"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-emerald-600 text-white py-3 rounded-2xl font-medium hover:bg-emerald-700"
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      <DataTable headers={["ID", "Name", "Price", "Stock"]}>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>${p.price}</td>
            <td className={p.stock < 10 ? "text-red-500" : ""}>{p.stock}</td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
