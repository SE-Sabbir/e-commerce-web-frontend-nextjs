"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiLoader, FiLock, FiMail, FiMapPin, FiPhone, FiShoppingBag, FiTag } from "react-icons/fi";
import Footer from "@/app/components/Footer";
import OurService from "@/app/components/OurService";
import { showToast } from "@/app/components/ToastProvider";

const checkoutUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/checkout`;
const initialForm = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  customerAddress: "",
  city: "Dhaka",
  comment: "",
  cupon: "",
};

const page = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserInfo = () => {
      const storedData = localStorage.getItem("userInfo");
      if (!storedData) {
        setUserInfo(null);
        return;
      }
      try {
        const storedObject = JSON.parse(storedData);
        setUserInfo(storedObject?.userInfo?.userInfo || storedObject?.userInfo || storedObject);
      } catch (err) {
        console.log(err);
        setUserInfo(null);
      }
    };

    loadUserInfo();
    window.addEventListener("authChanged", loadUserInfo);
    return () => window.removeEventListener("authChanged", loadUserInfo);
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = userInfo?.userId || userInfo?._id || userInfo?.id;
      if (!userId) {
        setCart(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/get-cart`, {
          params: { creatorId: userId },
        });
        setCart(response.data || null);
      } catch (err) {
        console.log(err);
        setError("We could not load your cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userInfo]);

  const items = cart?.cartItem?.cartItem || [];
  const cartId = cart?.cartItem?._id || cart?._id || cart?.cartId;
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.productId?.discountPrice || 0) * Number(item.qty || 0), 0),
    [items],
  );
  const deliveryCharge = form.city === "Dhaka" ? 80 : 120;
  const estimatedTotal = subtotal + deliveryCharge;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cartId) {
      setError("Your cart is empty or unavailable. Please return to the cart page.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await axios.post(checkoutUrl, { ...form, cartId });
      sessionStorage.setItem("pendingOrder", JSON.stringify({
        ...response.data,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
      }));
      showToast("Delivery details saved. Continue to payment.");
      router.push("/payment");
    } catch (err) {
      const message = err.response?.data?.message || "Your order could not be placed. Please check your details and try again.";
      setError(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9">
            <Link href="/cartpage" className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#01A49E] transition hover:text-[#028d88]"><FiArrowLeft /> Back to cart</Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#01A49E]">Secure checkout</p>
            <h1 className="font-poppins text-3xl font-bold text-[#212529] sm:text-4xl">Complete your order</h1>
            <p className="mt-2 text-sm text-[#666666]">Share your delivery details and we will take care of the rest.</p>
          </div>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_370px]"><div className="h-135 animate-pulse rounded-2xl bg-white shadow-sm" /><div className="h-105 animate-pulse rounded-2xl bg-white shadow-sm" /></div>
          ) : !userInfo ? (
            <div className="rounded-2xl border border-dashed border-[#c9e3e1] bg-white p-10 text-center shadow-sm"><FiLock className="mx-auto text-4xl text-[#01A49E]" /><h2 className="mt-4 font-poppins text-xl font-bold text-[#212529]">Please log in to continue</h2><p className="mt-2 text-sm text-[#666666]">Your cart is connected to your account.</p><Link href="/login" className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#01A49E] px-7 text-sm font-bold text-white">Go to login</Link></div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#c9e3e1] bg-white p-10 text-center shadow-sm"><FiShoppingBag className="mx-auto text-4xl text-[#01A49E]" /><h2 className="mt-4 font-poppins text-xl font-bold text-[#212529]">Your cart is empty</h2><Link href="/products" className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#01A49E] px-7 text-sm font-bold text-white">Explore products</Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_370px]">
              <section className="rounded-2xl border border-[#eeeeee] bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 border-b border-[#eeeeee] pb-5"><h2 className="font-poppins text-xl font-bold text-[#212529]">Delivery information</h2><p className="mt-1 text-sm text-[#777777]">All fields marked with * are required.</p></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-[#212529]">Full name *<input required name="customerName" value={form.customerName} onChange={updateField} placeholder="Your full name" className="mt-2 h-12 w-full rounded-lg border border-[#d9e5e4] px-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></label>
                  <label className="text-sm font-semibold text-[#212529]">Phone number *<span className="relative mt-2 block"><FiPhone className="absolute left-4 top-4 text-[#01A49E]" /><input required name="customerPhone" value={form.customerPhone} onChange={updateField} placeholder="01XXXXXXXXX" className="h-12 w-full rounded-lg border border-[#d9e5e4] pl-11 pr-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></span></label>
                  <label className="text-sm font-semibold text-[#212529] sm:col-span-2">Email address *<span className="relative mt-2 block"><FiMail className="absolute left-4 top-4 text-[#01A49E]" /><input required type="email" name="customerEmail" value={form.customerEmail} onChange={updateField} placeholder="you@example.com" className="h-12 w-full rounded-lg border border-[#d9e5e4] pl-11 pr-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></span></label>
                  <label className="text-sm font-semibold text-[#212529]">District *<span className="relative mt-2 block"><FiMapPin className="absolute left-4 top-4 text-[#01A49E]" /><select required name="city" value={form.city} onChange={updateField} className="h-12 w-full appearance-none rounded-lg border border-[#d9e5e4] bg-white pl-11 pr-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15"><option value="Dhaka">Dhaka</option><option value="Chattogram">Chattogram</option><option value="Rajshahi">Rajshahi</option><option value="Khulna">Khulna</option><option value="Sylhet">Sylhet</option><option value="Other">Other district</option></select></span></label>
                  <label className="text-sm font-semibold text-[#212529]">Address *<input required name="customerAddress" value={form.customerAddress} onChange={updateField} placeholder="House, road, area" className="mt-2 h-12 w-full rounded-lg border border-[#d9e5e4] px-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></label>
                  <label className="text-sm font-semibold text-[#212529] sm:col-span-2">Order note <textarea name="comment" value={form.comment} onChange={updateField} placeholder="Any delivery instructions? (optional)" rows="4" className="mt-2 w-full resize-none rounded-lg border border-[#d9e5e4] p-4 font-normal outline-none transition focus:border-[#01A49E] focus:ring-2 focus:ring-[#01A49E]/15" /></label>
                </div>
              </section>

              <aside className="rounded-2xl border border-[#eeeeee] bg-white p-6 shadow-sm lg:sticky lg:top-28">
                <h2 className="font-poppins text-xl font-bold text-[#212529]">Order summary</h2>
                <div className="mt-5 max-h-56 space-y-4 overflow-y-auto border-b border-[#eeeeee] pb-5">
                  {items.map((item) => <div key={item._id} className="flex gap-3"><img src={item.productId?.thumbnail} alt={item.productId?.title || "Product"} className="h-14 w-12 rounded-lg bg-[#f5f7f7] object-contain" /><div className="min-w-0 flex-1"><p className="line-clamp-1 text-sm font-semibold text-[#212529]">{item.productId?.title}</p><p className="mt-1 text-xs text-[#888888]">Qty: {item.qty}{item.varient ? ` | ${item.varient}` : ""}</p></div><p className="text-sm font-bold text-[#EB4227]">৳{Number(item.productId?.discountPrice || 0) * Number(item.qty || 0)}</p></div>)}
                </div>
                <div className="mt-5 space-y-3 border-b border-[#eeeeee] pb-5 text-sm"><div className="flex justify-between text-[#666666]"><span>Subtotal</span><span className="font-semibold text-[#212529]">৳{subtotal}</span></div><div className="flex justify-between text-[#666666]"><span>Delivery</span><span className="font-semibold text-[#01A49E]">৳{deliveryCharge}</span></div></div>
                <div className="flex items-center justify-between py-5"><span className="font-poppins font-bold text-[#212529]">Estimated total</span><span className="font-poppins text-2xl font-bold text-[#EB4227]">৳{estimatedTotal}</span></div>
                {error && <p role="alert" className="mb-4 rounded-lg bg-[#fff1ef] px-3 py-2 text-xs font-semibold leading-5 text-[#c53725]">{error}</p>}
                <button type="submit" disabled={submitting} className="flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#01A49E] text-sm font-bold text-white shadow-lg shadow-[#01A49E]/20 transition hover:bg-[#028d88] disabled:cursor-wait disabled:opacity-70">{submitting ? <><FiLoader className="animate-spin" /> Placing order...</> : <><FiLock /> Place order</>}</button>
                <p className="mt-4 text-center text-[11px] leading-5 text-[#999999]">Your order invoice will be sent by email after confirmation.</p>
              </aside>
            </form>
          )}
        </div>
      </main>
      <OurService />
      <Footer />
    </>
  );
};

export default page;