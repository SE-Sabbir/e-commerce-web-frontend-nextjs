"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiMinus, FiPlus, FiShoppingBag, FiTag, FiTrash2 } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import OurService from "@/app/components/OurService";
import Footer from "@/app/components/Footer";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadUserInfo = () => {
      const storeData = localStorage.getItem("userInfo");
      if (storeData) {
        try {
          const storeDataObject = JSON.parse(storeData);
          const user = storeDataObject?.userInfo?.userInfo || storeDataObject?.userInfo || storeDataObject;
          setUserInfo(user);
        } catch (err) {
          console.log(err);
        }
      } else {
        setUserInfo(null);
      }
    };
    loadUserInfo();
    window.addEventListener("authChanged", loadUserInfo);

    return () => {
      window.removeEventListener("authChanged", loadUserInfo);
    };
  }, []);

  const fetchCart = async (currentUserInfo = userInfo) => {
    const userId = currentUserInfo?.userId || currentUserInfo?._id || currentUserInfo?.id;
    if (!userId) {
      setItems([]);
      setTotal(0);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get("http://localhost:8000/cart/get-cart", {
        params: { creatorId: userId },
      });
      const cartData = response.data || {};
      const cartItems = cartData.cartItem?.cartItem || [];
      setItems(cartItems);
      setTotal(Number(cartData.total) || 0);
    } catch (error) {
      console.error("Unable to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userInfo]);

  const increaseQuantity = async (item) => {
    const creatorId = userInfo?.userId || userInfo?._id || userInfo?.id;
    setUpdatingId(item._id);
    try {
      await axios.post("http://localhost:8000/cart/add-to-cart", {
        creatorId,
        cartItem: [{
          productId: item.productId?._id || item.productId,
          varient: item.varient,
          qty: 1,
        }],
      });
      await fetchCart();
    } catch (error) {
      console.error("Unable to update cart quantity", error);
    } finally {
      setUpdatingId("");
    }
  };

  const decreaseQuantity = async (item) => {
    const creatorId = userInfo?.userId || userInfo?._id || userInfo?.id;
    setUpdatingId(item._id);
    try {
      await axios.post("http://localhost:8000/cart/add-to-cart", {
        creatorId,
        cartItem: [{
          productId: item.productId?._id || item.productId,
          varient: item.varient,
          qty: 1,
        }],
        action: "decrease",
      });
      await fetchCart();
    } catch (error) {
      console.error("Unable to decrease cart quantity", error);
    } finally {
      setUpdatingId("");
    }
  };

  const removeItem = async (itemId) => {
    const creatorId = userInfo?.userId || userInfo?._id || userInfo?.id;
    setRemovingId(itemId);
    try {
      await axios.delete("http://localhost:8000/cart/delete-cart", {
        data: { creatorId, productId: itemId },
      });
      await fetchCart();
    } catch (error) {
      console.error("Unable to remove cart item", error);
    } finally {
      setRemovingId("");
    }
  };

  const subtotal = useMemo(() => total, [total]);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  return (
    <>
      <main className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#01A49E]">Your selection</p>
              <h1 className="font-poppins text-3xl font-bold text-[#212529] sm:text-4xl">Shopping cart</h1>
              <p className="mt-2 text-sm text-[#666666]">Review your pieces before you place the order.</p>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-sm font-bold text-[#01A49E] transition hover:text-[#028d88]">
              Continue shopping <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_370px]">
              <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
              <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex min-h-105 flex-col items-center justify-center rounded-2xl border border-dashed border-[#c9e3e1] bg-white px-6 text-center shadow-sm">
              <div className="mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-[#e8f7f6] text-3xl text-[#01A49E]"><FiShoppingBag /></div>
              <h2 className="font-poppins text-2xl font-bold text-[#212529]">Your cart is waiting</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#666666]">There is nothing here yet. Find something you love and it will appear in this space.</p>
              <Link href="/products" className="mt-6 flex h-12 items-center gap-2 rounded-lg bg-[#01A49E] px-7 text-sm font-bold text-white shadow-lg shadow-[#01A49E]/20 transition hover:bg-[#028d88]">
                Explore products <FiArrowRight />
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_370px]">
              <section className="rounded-2xl border border-[#eeeeee] bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-[#eeeeee] pb-4">
                  <h2 className="font-poppins text-lg font-bold text-[#212529]">Cart items <span className="font-normal text-[#999999]">({items.length})</span></h2>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#999999]">Price</span>
                </div>
                <div className="divide-y divide-[#eeeeee]">
                  {items.map((item) => {
                    const product = item.productId || {};
                    return (
                      <article key={item._id} className="flex gap-4 py-5 first:pt-1 sm:gap-6">
                        <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f7f7] sm:h-32 sm:w-28">
                          <img src={product.thumbnail} alt={product.title || "Cart product"} className="h-full w-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:gap-5">
                          <div className="min-w-0">
                            <Link href="/products" className="line-clamp-2 font-poppins text-sm font-bold text-[#212529] transition hover:text-[#01A49E]">{product.title || "Product"}</Link>
                            <p className="mt-2 text-xs text-[#888888]">{item.varient ? `Size: ${item.varient}` : "Standard size"}</p>
                            <button type="button" onClick={() => removeItem(item._id)} disabled={removingId === item._id} className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#EB4227] cursor-pointer transition hover:text-[#b92f1c] disabled:opacity-50">
                              <FiTrash2 /> {removingId === item._id ? "Removing..." : "Remove"}
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:justify-between">
                            <p className="font-poppins text-base font-bold text-[#EB4227]">৳{product.discountPrice || 0}</p>
                            <div className="flex h-9 items-center overflow-hidden rounded-lg border border-[#d9e5e4]">
                              <button type="button" onClick={() => decreaseQuantity(item)} disabled={updatingId === item._id || removingId === item._id} aria-label="Decrease quantity" className="flex h-full w-9 items-center justify-center text-[#666666] transition hover:bg-[#e8f7f6] hover:text-[#01A49E] disabled:cursor-wait disabled:opacity-50"><FiMinus size={14} /></button>
                              <span className="flex h-full w-8 items-center justify-center border-x border-[#d9e5e4] text-sm font-bold text-[#212529]">{item.qty}</span>
                              <button type="button" onClick={() => increaseQuantity(item)} disabled={updatingId === item._id} aria-label="Increase quantity" className="flex h-full w-9 items-center justify-center text-[#666666] transition hover:bg-[#e8f7f6] hover:text-[#01A49E] disabled:cursor-wait disabled:opacity-50"><FiPlus size={14} /></button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-[#eeeeee] pt-5 text-xs text-[#777777]"><IoShieldCheckmarkOutline className="text-lg text-[#01A49E]" /> Secure shopping with protected checkout</div>
              </section>

              <aside className="rounded-2xl border border-[#eeeeee] bg-white p-6 shadow-sm lg:sticky lg:top-28">
                <h2 className="font-poppins text-xl font-bold text-[#212529]">Order summary</h2>
                <div className="mt-6 space-y-4 border-b border-[#eeeeee] pb-5 text-sm">
                  <div className="flex justify-between text-[#666666]"><span>Subtotal</span><span className="font-semibold text-[#212529]">৳{subtotal.toFixed(0)}</span></div>
                  <div className="flex justify-between text-[#666666]"><span>Delivery</span><span className="font-semibold text-[#01A49E]">Free</span></div>
                  {couponApplied && <div className="flex justify-between text-[#666666]"><span>Coupon discount</span><span className="font-semibold text-[#EB4227]">-৳{discount.toFixed(0)}</span></div>}
                </div>
                <div className="flex items-center justify-between py-5"><span className="font-poppins font-bold text-[#212529]">Total</span><span className="font-poppins text-2xl font-bold text-[#EB4227]">৳{grandTotal.toFixed(0)}</span></div>
                <div className="flex h-11 overflow-hidden rounded-lg border border-[#d9e5e4] bg-[#fafafa]">
                  <div className="flex items-center pl-3 text-[#01A49E]"><FiTag /></div>
                  <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
                  <button type="button" onClick={() => coupon.trim() && setCouponApplied(true)} className="px-4 text-xs font-bold text-[#01A49E] transition hover:bg-[#e8f7f6]">Apply</button>
                </div>
                {couponApplied && <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#16846f]"><FiCheck /> Coupon applied</p>}
                <Link href="/orderpage" className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[#01A49E] text-sm font-bold text-white shadow-lg shadow-[#01A49E]/20 transition hover:bg-[#028d88]">Proceed to order <FiArrowRight /></Link>
                <p className="mt-4 text-center text-[11px] leading-5 text-[#999999]">Taxes and delivery details are confirmed at checkout.</p>
              </aside>
            </div>
          )}
        </div>
      </main>
      <OurService />
      <Footer />
    </>
  );
};

export default CartPage;