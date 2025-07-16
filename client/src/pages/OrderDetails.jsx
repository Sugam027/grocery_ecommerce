import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import { useContextProvider } from "../context/AppContext";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { orderId } = useParams(); // assumes route like /order/:orderId
  const { user, products } = useContextProvider();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
          const { data } = await API.get(`/api/order/${orderId}`);
          console.log(data.orders)
        if (data.success) {
          setOrder(data.orders);
        } else {
          toast.error("Failed to fetch order details");
        }
      } catch (err) {
        toast.error("Error fetching order");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id && orderId) fetchOrder();
  }, [user, orderId]);

  if (loading) return <p className="text-center mt-10">Loading order...</p>;
  if (!order) return <p className="text-center mt-10 text-red-500">Order not found.</p>;

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Order Details</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment Type:</strong> {order.paymentType}</p>
        <p><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
        <p><strong>Total:</strong> NPR {order.amount}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-medium mb-2">Shipping Address</h2>
        <p>{order.addressId?.street}, {order.addressId?.municipality}</p>
        <p>{order.addressId?.city}</p>
        <p>{order.address?.phone}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-medium mb-2">Items</h2>
        {order.items.map((item, index) => {
          const product = products?.find((p) => p._id === item.product);
          return (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <div>
                <p className="font-semibold">{product?.name || "Product"}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p>NPR {product?.offerPrice * item.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
