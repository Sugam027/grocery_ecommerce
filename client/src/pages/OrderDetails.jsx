import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import { useContextProvider } from "../context/AppContext";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { orderId } = useParams(); // assumes route like /order/:orderId
  const { user, products, navigate } = useContextProvider();
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
    <>
    {/* <div className="px-6 py-8 max-w-3xl mx-auto">
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
              <p>NPR {order.amount}</p>
            </div>
          );
        })}
      </div>
    </div> */}

    <div className="flex flex-col justify-between bg-white rounded-md mt-2 md:mt-2 px-4 md:px-12 lg:px-16 xl:px-16 py-4">
      <p className='text-[32px] text-center font-bold mb-2'><span className='text-[#4CB944]'>Order</span> Details</p>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Details */}
        <div className="md:col-span-2 bg-gray-200 rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <h3 className="text-lg font-semibold mb-4">Order Information</h3>
            <button
              onClick={() => navigate("/order")}
              className="cursor-pointer bg-gray-400 py-[5px] px-[10px] rounded-md hover:bg-gray-300"
            >
              ← Back to Orders
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> Rs. {order.amount}</p>
            <p><strong>Customer:</strong> {order.userId?.name} ({order.userId?.email})</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toDateString()}</p>
            <p><strong>Payment Method:</strong> {order.paymentType}</p>
            <p><strong>Current Payment Status:</strong> {order.isPaid ? "Paid" : "Pending"}</p>
            <p><strong>Current Status:</strong> {order.status}</p>
            <p><strong>Delivery Date:</strong> {order.deliveryDate ? new Date(order.deliveryDate).toDateString() : "N/A"}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Items Ordered</h3>
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-400 p-3 rounded mb-2"
              >
                <div>
                  <p className="font-semibold">{item.product?.name}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-right font-semibold">
                  Rs. {item.product?.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm">
              {order.addressId?.name}<br />
              {order.addressId?.street}, {order.addressId?.municipality}<br />
              {order.addressId?.city}, {order.addressId?.zip || ""}<br />
              Nepal
            </p>
          </div>
        </div>
      </div>
      </div>
      </>
  );
};

export default OrderDetails;
