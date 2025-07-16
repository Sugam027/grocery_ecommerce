// import React, { useState, useEffect } from "react";
// import {v4 as uuidv4} from "uuid";
// import CryptoJS from "crypto-js"

// const Payment = () => {
//     const [amount, setAmount] = useState("");
//     const [productName, setProductName] = useState("");
//     const [transactionId, setTransactionId] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
    
//     const [formData, setFormData] = useState({
//         amount: "100",
//         tax_amount: "0",
//         total_amount: "10",
//         transaction_uuid: uuidv4(),
//         product_code: "EPAYTEST",
//         product_service_charge: "0",
//         product_delivery_charge: "0",
//         success_url: `${import.meta.env.VITE_BASE_URL}/paymentsuccess`,
//         failure_url: `${import.meta.env.VITE_BASE_URL}/paymentfailure`,
//         signed_field_names: "total_amount,transaction_uuid,product_code",
//         signature: "",    
//         secret: "8gBm/:&EnhH.1/q",
//     })

//     const generateSignature = (total_amount, transaction_uuid, product_code, secret) =>{
// const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

//         const hash = CryptoJS.HmacSHA256(hashString, secret);
//         const hashSignature = CryptoJS.enc.Base64.stringify(hash);     
//         return hashSignature;
//     }

// useEffect(() => {
//   const {
//     amount,
//     tax_amount,
//     product_service_charge,
//     product_delivery_charge,
//     transaction_uuid,
//     product_code,
//     secret,
//   } = formData;

//   const total =
//     parseFloat(amount || 0) +
//     parseFloat(tax_amount || 0) +
//     parseFloat(product_service_charge || 0) +
//     parseFloat(product_delivery_charge || 0);

//   const totalAmount = total.toFixed(2);

//   const signature = generateSignature(
//     totalAmount,
//     transaction_uuid,
//     product_code,
//     secret
//   );

//   setFormData((prev) => ({
//     ...prev,
//     total_amount: totalAmount,
//     signature,
//   }));
// }, [formData.amount, formData.tax_amount, formData.product_service_charge, formData.product_delivery_charge]);





//     useEffect(() =>{
//         const {total_amount, transaction_uuid, product_code, secret}= formData;
//         const hashSignature = generateSignature(total_amount,transaction_uuid,product_code,secret);
//         console.log(hashSignature)
//         setFormData({...formData, signature: hashSignature});
//     }, [formData.amount]);


//     console.log({
//   hashString: `total_amount=${formData.total_amount},transaction_uuid=${formData.transaction_uuid},product_code=${formData.product_code}`,
//   signature: formData.signature,
//   total_amount: formData.total_amount,
//   transaction_uuid: formData.transaction_uuid,
//   product_code: formData.product_code,
// });

//     return (
//         <>
//             <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
//                 <input type="text" id="amount" name="amount" value={formData.amount} onChange={({target}) =>{
//                     setFormData({...formData, amount: target.value, total_amount: target.value})
//                 }} required />
//                 <input type="text" id="tax_amount" name="tax_amount" value ={formData.tax_amount} required />
//                 <input type="text" id="total_amount" name="total_amount" value={formData.total_amount} required />
//                 <input type="text" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
//                 <input type="text" id="product_code" name="product_code" value ={formData.product_code} required />
//                 <input type="text" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} required />
//                 <input type="text" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} required />
//                 <input type="text" id="success_url" name="success_url" value={formData.success_url} required />
//                 <input type="text" id="failure_url" name="failure_url" value={formData.failure_url} required />
//                 <input type="text" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} required />
//                 <input type="text" id="signature" name="signature" value={formData.signature} required />
//                 <input value="Submit" type="submit" />
//             </form>
//         </>
//     )
// }

// export default Payment



// //  function EsewaPayment() {
// //   const [amount, setAmount] = useState("");
// //   const [productName, setProductName] = useState("");
// //   const [transactionId, setTransactionId] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const { toast } = useToast();

// //   useEffect(() => {
// //     const fetchDummyData = async () => {
// //       try {
// //         const response = await fetch("/api/dummy-data?method=esewa");
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const data = await response.json();
// //         setAmount(data.amount);
// //         setProductName(data.productName);
// //         setTransactionId(data.transactionId);

// //         toast({
// //           title: "Data loaded successfully",
// //           description: "Payment details have been pre-filled.",
// //         });
// //       } catch (error) {
// //         const errorMessage =
// //           error instanceof Error ? error.message : "An unknown error occurred";
// //         console.error("Error fetching dummy data:", errorMessage);

// //         toast({
// //           variant: "destructive",
// //           title: "Error loading data",
// //           description: "Failed to load initial data. Please refresh the page.",
// //         });
// //       }
// //     };

// //     fetchDummyData();
// //   }, [toast]);

// //   const handlePayment = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       const response = await fetch("/api/initiate-payment", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           method: "esewa",
// //           amount,
// //           productName,
// //           transactionId,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Payment initiation failed: ${response.statusText}`);
// //       }

// //       const paymentData = await response.json();

// //       toast({
// //         title: "Payment Initiated",
// //         description: "Redirecting to eSewa payment gateway...",
// //       });

// //       const form = document.createElement("form");
// //       form.method = "POST";
// //       form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

// //       const esewaPayload = {
// //         amount: paymentData.amount,
// //         tax_amount: paymentData.esewaConfig.tax_amount,
// //         total_amount: paymentData.esewaConfig.total_amount,
// //         transaction_uuid: paymentData.esewaConfig.transaction_uuid,
// //         product_code: paymentData.esewaConfig.product_code,
// //         product_service_charge:
// //           paymentData.esewaConfig.product_service_charge,
// //         product_delivery_charge:
// //           paymentData.esewaConfig.product_delivery_charge,
// //         success_url: paymentData.esewaConfig.success_url,
// //         failure_url: paymentData.esewaConfig.failure_url,
// //         signed_field_names: paymentData.esewaConfig.signed_field_names,
// //         signature: paymentData.esewaConfig.signature,
// //       };

// //       console.log({ esewaPayload });

// //       Object.entries(esewaPayload).forEach(([key, value]) => {
// //         const input = document.createElement("input");
// //         input.type = "hidden";
// //         input.name = key;
// //         input.value = String(value);
// //         form.appendChild(input);
// //       });

// //       document.body.appendChild(form);
// //       form.submit();
// //       document.body.removeChild(form);
// //     } catch (error) {
// //       const errorMessage =
// //         error instanceof Error ? error.message : "An unknown error occurred";
// //       console.error("Payment error:", errorMessage);
// //       setError("Payment initiation failed. Please try again.");
// //       toast({
// //         variant: "destructive",
// //         title: "Payment Error",
// //         description: "Payment initiation failed. Please try again.",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //       <div className="w-full max-w-md mx-4">
// //         <div>
// //           <h2>eSewa Payment</h2>
// //           <p>Enter payment details for eSewa</p>
// //         </div>
// //         <form onSubmit={handlePayment}>
// //           <div className="space-y-4">
// //             {error && (
// //               <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
// //                 {error}
// //               </div>
// //             )}
// //             <div className="space-y-2">
// //               <label htmlFor="amount">Amount (NPR)</label>
// //               <imput
// //                 id="amount"
// //                 type="number"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 required
// //                 min="1"
// //                 step="0.01"
// //                 placeholder="Enter amount"
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <button
// //               type="submit"
// //               className="w-full"
// //               disabled={isLoading || !amount || !productName || !transactionId}
// //             >
// //               {isLoading ? "Processing..." : "Pay with eSewa"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }



// pages/Payment.jsx
import React, { useEffect, useRef } from "react";
import CryptoJS from "crypto-js";

const Payment = () => {
  const formRef = useRef();

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("epay_session"));
    if (!session) return;

    const { amount, transaction_uuid } = session;

    const total_amount = amount.toFixed(2).toString();
    const product_code = "EPAYTEST";
    const secret = "8gBm/:&EnhH.1/q"; // Test secret key

    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    const form = formRef.current;

    const inputs = {
      amount: total_amount,
      tax_amount: "0",
      total_amount: total_amount,
      transaction_uuid,
      product_code,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${window.location.origin}/order/esewa-success?transaction_uuid=${transaction_uuid}`,
      failure_url: `${window.location.origin}/order/esewa-failed`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
    };

    // Append hidden inputs to form
    for (const [key, value] of Object.entries(inputs)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    // Auto submit form
    form.submit();
  }, []);

  return (
    <form
      ref={formRef}
      method="POST"
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
    >
      <p className="text-center mt-10 text-gray-600">Redirecting to eSewa...</p>
    </form>
  );
};

export default Payment;

