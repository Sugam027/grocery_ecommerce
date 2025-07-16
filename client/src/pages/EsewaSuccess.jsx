import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../API"; // adjust path if needed
import toast from "react-hot-toast";

const EsewaSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const rawTransactionUUID = searchParams.get("transaction_uuid");
  const transaction_uuid = rawTransactionUUID?.split("?")[0];
  console.log(transaction_uuid)

  useEffect(() => {
    const verifyEsewaPayment = async () => {
      if (!transaction_uuid) {
        toast.error("Missing transaction reference");
        navigate("/cart"); // or go to home
        return;
      }

      try {
        const res = await API.post("/api/order/verify-esewa", {
          transaction_uuid,
        });

        if (res.data.success) {
          toast.success("Payment verified successfully");
        } else {
          toast.error("Payment verified but order creation failed");
        }
      } catch (error) {
        toast.error("Payment verification failed");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyEsewaPayment();
  }, [transaction_uuid, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      {loading ? (
        <p className="text-gray-600 text-lg">Verifying your payment...</p>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-green-600 mb-2">✅ Payment Successful!</h1>
          <button
            onClick={() => navigate("/order")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default EsewaSuccess;
