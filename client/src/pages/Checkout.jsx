import React, { useState } from 'react';
import { useContextProvider } from '../context/AppContext';
import toast from 'react-hot-toast';
import API from '../API';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
  const { user, cartItems, setCartItems, getCartAmount, navigate } = useContextProvider();
  const [paymentType, setPaymentType] = useState('');
  const [addressId, setAddressId] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    municipality: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.municipality.trim()) newErrors.municipality = "Municipality is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{7,10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await API.post('/api/address/store', {
        ...formData,
        userId: user._id,
      });
      console.log(res)

      if (res.data.success) {
        toast.success("Address saved");
        setAddressId(res.data.addressId); // store address ID for later use
      } else {
        toast.error("Failed to save address");
      }
    } catch (err) {
      toast.error("Error saving address");
      console.error(err);
    }
  };

  // const handlePlaceOrder = async () => {
  //   if (!addressId) {
  //     toast.error("Please save the address first");
  //     return;
  //   }

  //   const items = cartItems.map((item) => ({
  //     product: item._id,
  //     quantity: item.quantity,
  //   }));

  //   const orderPayload = {
  //     userId: user._id,
  //     items,
  //     amount: getCartAmount(),
  //     addressId,
  //     paymentType,
  //     isPaid: paymentType === "eSewa" ? true : false,
  //   };

  //   if (paymentType === "COD") {
  //     try {
  //       const res = await API.post('/api/orders/create', orderPayload);
  //       if (res.data.success) {
  //         toast.success("Order placed successfully!");
  //         navigate('/order/success');
  //       } else {
  //         toast.error("Order failed");
  //       }
  //     } catch (err) {
  //       toast.error("Error placing order");
  //       console.error(err);
  //     }
  //   } else if (paymentType === "eSewa") {
  //     // Redirect to eSewa with required params (simulate it here)
  //     const esewaURL = `https://esewa.com.np/epay/main?amt=${getCartAmount()}&txAmt=0&psc=0&pdc=0&scd=EPAYTEST&pid=ORDER12345&su=http://localhost:3000/esewa-success&fu=http://localhost:3000/esewa-failed`;
  //     window.location.href = esewaURL;
  //   } else {
  //     toast.error("Invalid payment type selected");
  //   }
  // };

  const handlePlaceOrder = async () => {
  if (!addressId) {
    toast.error("Please save the address first");
    return;
  }
  console.log(cartItems)

  const items = Object.entries(cartItems).map(([productId, quantity]) => ({
    product: productId,
    quantity,
  }));

  const transaction_uuid = uuidv4();

  if (paymentType === "COD") {
    try {
      const res = await API.post('/api/order/create', {
        userId: user._id,
        items,
        amount: getCartAmount(),
        addressId,
        paymentType: "COD",
        isPaid: false
      });

      if (res.data.success) {
        toast.success("Order placed successfully!");
        setCartItems([]);
        navigate('/order/success');
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      toast.error("Error placing order");
      console.error(err);
    }
  } else if (paymentType === "eSewa") {
    try {
      const res = await API.post('/api/order/session', {
        userId: user._id,
        items,
        amount: getCartAmount(),
        addressId,
        transaction_uuid
      });

      if (res.data.success) {
        // Save in sessionStorage to access in Payment.jsx
        sessionStorage.setItem("epay_session", JSON.stringify({
          amount: getCartAmount(),
          transaction_uuid
        }));
        setCartItems([])

        navigate('/cart/order/payment'); // Go to payment form
      } else {
        toast.error("Failed to prepare payment session");
      }
    } catch (err) {
      toast.error("Failed to initiate eSewa payment");
      console.error(err);
    }
  }
};

  return (
    <div className="bg-gray-100 px-4 md:px-12 lg:px-16 xl:px-16 py-4">
      <div className="justify-between mb-6 rounded-lg p-3 sm:flex sm:justify-start gap-4">
        <div className="mt-6 h-full rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-2/3">
          <form onSubmit={handleSaveAddress} method="post">
            <p className="text-[20px]">Delivery address</p>
            {["name", "email", "city", "municipality", "street", "phone"].map((field) => (
              <div className="mt-4" key={field}>
                <label htmlFor={field} className="block font-medium mb-1 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "email" ? "you@example.com" : `Enter ${field}`}
                  className="w-full px-3 py-2 text-gray-500 placeholder-gray-500 text-sm outline-none bg-gray-100 border border-gray-300/80 h-10 rounded-[10px]"
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full mt-2 bg-[#4CB944] hover:bg-[#417B38] text-white py-2 transition h-10 rounded-[10px]"
            >
              Save Address
            </button>
          </form>
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">Rs. {getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">Free Delivery</p>
          </div>

          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">Rs. {getCartAmount()}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
            <div className="mb-4 mt-4">
              <label className="block mb-1">Payment Method</label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="COD">Cash on Delivery</option>
                <option value="eSewa">eSewa</option>
              </select>
            </div>

          <button
            className="mt-6 w-full rounded-md bg-[#4CB944] py-1.5 font-medium text-blue-50 hover:bg-[#417B38]"
            onClick={handlePlaceOrder}
            disabled={!addressId || !paymentType}
          >
            {paymentType === "eSewa" ? "Proceed to Pay" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
