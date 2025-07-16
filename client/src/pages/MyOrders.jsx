import React, { useEffect, useState } from "react";
import { useContextProvider } from "../context/AppContext";
import API from "../API";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user , navigate} = useContextProvider();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log(user)
        const { data } = await API.get(`/api/order/user/${user._id}`);
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error("Failed to load orders");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchOrders();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">You have no orders yet.</p>;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
          onClick={() => navigate(`/order/${order._id}`)}
            key={order._id}
            className="bg-white p-4 shadow rounded-lg hover:shadow-md transition border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">
                  Total: NPR {order.amount} • {order.paymentType} •{" "}
                  {order.isPaid ? "Paid" : "Not Paid"}
                </p>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
