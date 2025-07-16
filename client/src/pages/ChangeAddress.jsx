import React, { useState, useEffect } from 'react';
import { useContextProvider } from '../context/AppContext';
import toast from 'react-hot-toast';
import API from '../API';

const ChangeAddress = () => {

    const {user, address, getCartAmount, navigate} = useContextProvider();
    const [addressId, setAddressId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        municipality: '',
        phone: '',
    });
        
    useEffect(() => {
    if (address) {
        setFormData({
        name: address.name || '',
        email: address.email || '',
        street: address.street || '',
        city: address.city || '',
        municipality: address.municipality || '',
        phone: address.phone || '',
        });
        setAddressId(address._id);
    }
    }, [address]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const payload = {
        ...formData,
        userId: user._id,
        };

        try {
        let res;
        if (addressId) {
            // update
            res = await API.put(`/api/address/update/${addressId}`, payload);
        } else {
            // insert
            res = await API.post('/api/address/store', payload);
        }

        if (res.data.success) {
            toast.success(addressId ? "Address updated!" : "Address saved!");
            navigate('/cart');
        } else {
            toast.error(res.data.message || "Failed to save/update address");
        }
        } catch (err) {
        toast.error("Server error");
        console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


  return (
    <>
    <div className="bg-gray-100 px-4 md:px-12 lg:px-16 xl:px-16 py-4">
      <div className="justify-between mb-6 rounded-lg p-3 sm:flex sm:justify-start gap-4">
        <div className="mt-6 h-full rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-2/3">
          <form onSubmit={onSubmitHandler} method='post'>
            <p className='text-[20px]'>Delivery address</p>
            {["name", "email", "city", "municipality", "street", "phone"].map((field) => (
              <div className="mt-4" key={field}>
                <label htmlFor={field} className="block font-medium mb-1 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "email" ? "you@example.com" : `Enter ${field}`}
                  className="w-full px-3 py-2 text-gray-500 placeholder-gray-500 text-sm outline-none bg-gray-100 border border-gray-300/80 h-10 rounded-[10px]"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white py-2 hover:bg-green-700 transition h-10 rounded-[10px]"
            >
              {addressId ? "Update" : "Save"} Address
            </button>
          </form>
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${getCartAmount()}</p>
                </div>
                <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">0</p>
                </div>

                <div className="text-sm text-gray-800 mt-2">
                    <p className="font-semibold mb-1">Delivery Address:</p>
                    {address ? (
                        <div className="mb-3">
                        <p>{address.street}, {address.municipality}, {address.city}</p>
                        <button
                            className="mt-2 text-blue-600 underline text-sm"
                            onClick={() => navigate('/cart/change-address')}
                        >
                            Change Address
                        </button>
                        </div>
                    ) : (
                        <div className="mb-3 text-red-600">
                        <p>No address found.</p>
                        <button
                            className="mt-1 text-blue-600 underline text-sm"
                            onClick={() => navigate('/cart/checkout')}
                        >
                            Add Address
                        </button>
                        </div>
                    )}
                </div>

                <hr className="my-4" />
                <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">${getCartAmount()}</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-[#4CB944] py-1.5 font-medium text-blue-50 hover:bg-[#417B38]" onClick={() => navigate('/cart/checkout')}>Proceed to Pay</button>
            </div>
      </div>
    </div>

    </>
  );
};

export default ChangeAddress;
