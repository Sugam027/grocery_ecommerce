import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../API";

const AdminOrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get(`/api/order/${id}`);
      if (res.data.success) {
          const data = res.data.orders;
          console.log(res.data)
        setOrder(data);
        setStatus(data.status || "processing");
        setPaymentStatus(data.isPaid ? "Paid" : "Pending");
        setDeliveryDate(data.deliveryDate?.split("T")[0] || "");
        setTrackingNumber(data.trackingNumber || "");
        setNotes(data.notes || "");
      }
    } catch (err) {
      toast.error("Failed to fetch order");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/api/order/update/${id}`, {
        status,
        isPaid: paymentStatus === "Paid",
        deliveryDate,
        trackingNumber,
        notes,
      });

      if (res.data.success) {
        toast.success("Order updated successfully");
        fetchOrder();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error updating order");
      console.error(err);
    }
  };

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="py-5 px-2 mt-2 flex flex-col justify-between bg-white rounded-md">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Edit Order: {order._id || "N/A"}
        </h2>
        <button
          onClick={() => navigate("/admin/orders")}
          className="cursor-pointer bg-gray-200 py-[5px] px-[10px] rounded-md hover:bg-gray-300"
        >
          ← Back to Orders
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="md:col-span-2 bg-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Order Information</h3>
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

        {/* Edit Form */}
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>

          <label className="block mb-2 text-sm">Order Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-400 text-white rounded"
          >
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
          </select>

          <label className="block mb-2 text-sm">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-400 text-white rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>


          <label className="block mb-2 text-sm">Delivery Date</label>
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-400 text-white rounded"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-[#4CB944] hover:bg-[#417B38] transition text-white font-bold py-2 rounded"
          >
            Update Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderEdit;
