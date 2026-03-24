"use client";
import { useState, useEffect } from "react";
import { getCustomers, getProducts, createOrder } from "../../lib/api";

export default function CreateOrderPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Promise.all([getCustomers(), getProducts()]).then(([c, p]) => {
      setCustomers(c);
      setProducts(p);
    });
  }, []);

  function addToCart() {
    if (!selectedProduct) return;
    const prod = products.find((p) => p.id === selectedProduct);
    if (!prod) return;
    setCart([
      ...cart,
      { productId: prod.id, name: prod.name, price: prod.price, quantity: qty },
    ]);
    setQty(1);
    setSelectedProduct(null);
  }

  async function handleCreateOrder() {
    if (!selectedCustomer || cart.length === 0) return;
    setSubmitting(true);
    try {
      await createOrder({
        customerId: selectedCustomer,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
      setSuccess(true);
      setCart([]);
      setSelectedCustomer(null);
    } catch {
      alert("Failed to create order");
    } finally {
      setSubmitting(false);
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Create New Order</h1>
      {success && (
        <div className="bg-green-100 text-green-700 p-6 rounded-2xl mb-8 text-center">
          Order created successfully! 🎉
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="font-medium mb-4">1. Select Customer</h2>
          <select
            value={selectedCustomer || ""}
            onChange={(e) => setSelectedCustomer(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-2xl px-5 py-3 mb-8"
          >
            <option value="">Choose customer...</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <h2 className="font-medium mb-4">2. Add Items</h2>
          <div className="flex gap-3 mb-6">
            <select
              value={selectedProduct || ""}
              onChange={(e) => setSelectedProduct(Number(e.target.value))}
              className="flex-1 border border-gray-300 rounded-2xl px-5 py-3"
            >
              <option value="">Select product...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - ${p.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-24 border border-gray-300 rounded-2xl px-5 py-3 text-center"
            />
            <button
              onClick={addToCart}
              className="bg-gray-800 text-white px-6 rounded-2xl"
            >
              Add
            </button>
          </div>

          {cart.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium mb-3">Cart</h3>
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between px-5 py-4 border-b"
                >
                  <div>
                    {item.name} × {item.quantity}
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="mt-4 text-right text-xl font-semibold">
                Total: ${total}
              </div>
            </div>
          )}
        </div>

        <div className="card h-fit">
          <button
            onClick={handleCreateOrder}
            disabled={!selectedCustomer || cart.length === 0 || submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg disabled:bg-gray-300"
          >
            {submitting ? "Creating..." : "Create Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
