import React, { useEffect, useState } from "react";
// import moment from "moment";
// import { BadgeCheck, Clock } from "lucide-react";
import API from "../../API";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/order");
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "cod") return order.paymentType === "COD";
    if (filter === "esewa") return order.paymentType === "eSewa";
    if (filter === "paid") return order.isPaid;
    if (filter === "pending") return !order.isPaid;
    return true;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">📦 All Orders</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", "cod", "esewa", "paid", "pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === type
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, i) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{order.userId?.name || "Unknown"}</td>
                <td className="p-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      {item.product?.name || "Product"} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-3">Rs. {order.amount}</td>
                <td className="p-3">{order.paymentType}</td>
                <td className="p-3">
                  {order.isPaid ? (
                    <span className="text-green-600 font-medium">Confirmed</span>
                  ) : (
                    <span className="text-yellow-500 font-medium">Pending</span>
                  )}
                </td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
