"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiCheckCircle, FiLock, FiPhone, FiShield, FiShoppingBag } from "react-icons/fi";
import Footer from "@/app/components/Footer";
import OurService from "@/app/components/OurService";
import { showToast } from "@/app/components/ToastProvider";

const paymentMethods = [
  { id: "bkash", name: "bKash", color: "#e2136e", description: "Send money with bKash" ,imgurl:"https://res.cloudinary.com/dxr5inpsy/image/upload/v1790583531/bkash_logo_ekpbvm.png" },
  { id: "nagad", name: "Nagad", color: "#f58220", description: "Pay using Nagad" ,imgurl:"https://res.cloudinary.com/dxr5inpsy/image/upload/v1790583531/nogod_logo_ryh0yj.png" },
  { id: "rocket", name: "Rocket", color: "#713d96", description: "Send money with Rocket" ,imgurl:"https://res.cloudinary.com/dxr5inpsy/image/upload/v1790584805/rocket_logo_lsobuw.png" },
  { id: "cod", name: "Cash on delivery", color: "#01A49E", description: "Pay when your order arrives", imgurl:"https://res.cloudinary.com/dxr5inpsy/image/upload/v1790584710/cash-delivery-concept-vector-illustration_620585-2106_p37fi3.avif" },
];

const page = () => {
  const [order, setOrder] = useState(null);
  const [method, setMethod] = useState("bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pendingOrder = sessionStorage.getItem("pendingOrder");
    if (!pendingOrder) {
      setLoading(false);
      return;
    }

    try {
      setOrder(JSON.parse(pendingOrder));
    } catch (err) {
      console.log(err);
      sessionStorage.removeItem("pendingOrder");
    } finally {
      setLoading(false);
    }
  }, []);

  const selectedMethod = paymentMethods.find((paymentMethod) => paymentMethod.id === method);

  const handleMethodChange = (methodId) => {
    setMethod(methodId);
    setAccountNumber("");
    setTransactionId("");
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (method !== "cod" && (!accountNumber.trim() || !transactionId.trim())) {
      const message = "Enter the mobile number and transaction ID used for this payment.";
      setError(message);
      showToast(message, "error");
      return;
    }

    setError("");
    setConfirmed(true);
    showToast("Your order has been confirmed.");
    sessionStorage.removeItem("pendingOrder");
  };

  if (!order && !confirmed) {
    return (
      <>
        <main className="min-h-screen bg-[#fafafa] px-4 py-12 sm:px-6 lg:py-20">
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-dashed border-[#c9e3e1] bg-white px-6 py-12 text-center shadow-sm">
            <FiShoppingBag className="text-5xl text-[#01A49E]" />
            <h1 className="mt-5 font-poppins text-2xl font-bold text-[#212529]">No pending order found</h1>
            <p className="mt-2 text-sm text-[#666666]">Start checkout again to choose a payment method.</p>
            <Link href="/cartpage" className="mt-6 flex h-11 items-center rounded-lg bg-[#01A49E] px-7 text-sm font-bold text-white">Return to cart</Link>
          </div>
        </main>
        <OurService />
        <Footer />
      </>
    );
  }

  if (confirmed) {
    return (
      <>
        <main className="min-h-screen bg-[#fafafa] px-4 py-12 sm:px-6 lg:py-20">
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-[#d7eeeb] bg-white px-6 py-12 text-center shadow-sm">
            <FiCheckCircle className="text-6xl text-[#01A49E]" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#01A49E]">Order confirmed</p>
            <h1 className="mt-2 font-poppins text-3xl font-bold text-[#212529]">Thank you for your order</h1>
            <p className="mt-3 text-sm leading-6 text-[#666666]">Your invoice has been sent to your email address.</p>
            <div className="mt-7 w-full rounded-xl bg-[#f1fbfa] p-5 text-left text-sm">
              <div className="flex justify-between gap-4"><span className="text-[#666666]">Order ID</span><strong className="text-[#212529]">{order?.orderId || "Confirmed"}</strong></div>
              <div className="mt-3 flex justify-between gap-4"><span className="text-[#666666]">Payment method</span><strong className="text-[#212529]">{selectedMethod?.name}</strong></div>
              <div className="mt-3 flex justify-between gap-4"><span className="text-[#666666]">Total paid</span><strong className="text-[#EB4227]">৳{order?.totalPrice || 0}</strong></div>
            </div>
            <Link href="/products" className="mt-8 flex h-12 items-center justify-center rounded-lg bg-[#01A49E] px-8 text-sm font-bold text-white transition hover:bg-[#028d88]">Continue shopping</Link>
          </div>
        </main>
        <OurService />
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9">
            <Link href="/orderpage" className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#01A49E] transition hover:text-[#028d88]"><FiArrowLeft /> Back to order details</Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#01A49E]">Secure payment</p>
            <h1 className="font-poppins text-3xl font-bold text-[#212529] sm:text-4xl">Choose how to pay</h1>
            <p className="mt-2 text-sm text-[#666666]">Select a payment method to complete your order.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_370px]">
            <section className="rounded-2xl border border-[#eeeeee] bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 border-b border-[#eeeeee] pb-5"><h2 className="font-poppins text-xl font-bold text-[#212529]">Payment method</h2><p className="mt-1 text-sm text-[#777777]">Mobile banking payments are confirmed with your transaction ID.</p></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {paymentMethods.map((paymentMethod) => (
                  <button type="button" key={paymentMethod.id} onClick={() => handleMethodChange(paymentMethod.id)} className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition ${method === paymentMethod.id ? "border-[#01A49E] bg-[#f1fbfa]" : "border-[#eeeeee] hover:border-[#b9dcd9]"}`}>
                    {paymentMethod.imgurl ? <img src={paymentMethod.imgurl} alt="" className="h-11 w-11 rounded-lg object-contain" /> : <span className="flex h-11 w-11 items-center justify-center rounded-lg text-sm font-bold text-white" style={{ backgroundColor: paymentMethod.color }}>COD</span>}
                    <span><strong className="block text-sm text-[#212529]">{paymentMethod.name}</strong><span className="mt-1 block text-xs text-[#777777]">{paymentMethod.description}</span></span>
                  </button>
                ))}
              </div>

              {method !== "cod" && <div className="mt-7 rounded-xl bg-[#f8fbfb] p-5"><div className="flex items-start gap-3"><FiShield className="mt-1 shrink-0 text-xl text-[#01A49E]" /><div><h3 className="font-poppins text-sm font-bold text-[#212529]">Complete your {selectedMethod.name} payment</h3><p className="mt-1 text-xs leading-5 text-[#666666]">Send the exact order total to the store mobile banking number, then enter your payment details below.</p></div></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-[#212529]">Your mobile number<span className="relative mt-2 block"><FiPhone className="absolute left-4 top-4 text-[#01A49E]" /><input required value={accountNumber} onChange={(event) => { setAccountNumber(event.target.value); setError(""); }} placeholder="01XXXXXXXXX" className="h-12 w-full rounded-lg border border-[#d9e5e4] pl-11 pr-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></span></label><label className="text-sm font-semibold text-[#212529]">Transaction ID<input required value={transactionId} onChange={(event) => { setTransactionId(event.target.value); setError(""); }} placeholder="Example: 8N7ABC123" className="mt-2 h-12 w-full rounded-lg border border-[#d9e5e4] px-4 font-normal uppercase outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></label></div></div>}
              {method === "cod" && <div className="mt-7 rounded-xl bg-[#f1fbfa] p-5 text-sm leading-6 text-[#666666]">Pay the delivery agent in cash when your order arrives. Please keep the exact amount ready.</div>}
              {error && <p role="alert" className="mt-5 rounded-lg bg-[#fff1ef] px-3 py-2 text-xs font-semibold leading-5 text-[#c53725]">{error}</p>}
            </section>

            <aside className="rounded-2xl border border-[#eeeeee] bg-white p-6 shadow-sm lg:sticky lg:top-28"><h2 className="font-poppins text-xl font-bold text-[#212529]">Order summary</h2><div className="mt-6 space-y-4 border-b border-[#eeeeee] pb-5 text-sm"><div className="flex justify-between text-[#666666]"><span>Product total</span><span className="font-semibold text-[#212529]">৳{order?.productPrice || 0}</span></div><div className="flex justify-between text-[#666666]"><span>Delivery</span><span className="font-semibold text-[#01A49E]">৳{order?.deliveryCharge || 0}</span></div>{Number(order?.cuponDiscount) > 0 && <div className="flex justify-between text-[#666666]"><span>Coupon discount</span><span className="font-semibold text-[#EB4227]">-৳{order.cuponDiscount}</span></div>}</div><div className="flex items-center justify-between py-5"><span className="font-poppins font-bold text-[#212529]">Total to pay</span><span className="font-poppins text-2xl font-bold text-[#EB4227]">৳{order?.totalPrice || 0}</span></div><button type="submit" className="flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#01A49E] text-sm font-bold text-white shadow-lg shadow-[#01A49E]/20 transition hover:bg-[#028d88]"><FiLock /> Confirm payment</button><p className="mt-4 flex items-center justify-center gap-1 text-center text-[11px] leading-5 text-[#999999]"><FiShield /> Secure payment confirmation</p></aside>
          </form>
        </div>
      </main>
      <OurService />
      <Footer />
    </>
  );
};

export default page;