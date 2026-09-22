"use client";
import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoCart, IoMenu, IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import Link from "next/link";
import CartSidebar from "./CartSidebar";
import axios from "axios";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const cartList = product?.cartItem?.cartItem || [];

  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);

  useEffect(() => {
    const storeData = localStorage.getItem("userInfo");
    if (storeData) {
      try {
        const storeDataObject = JSON.parse(storeData);
        const user = storeDataObject?.userInfo?.userInfo || storeDataObject?.userInfo || storeDataObject;
        setUserInfo(user);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  
  const handelLogout = () => {
    console.log("btn click hossa");
    localStorage.clear();
    setUserInfo(null);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/get-cart`,
          {
            params: { creatorId: "6909bab7ec77eeef7168a39b" },
          },
        );
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    // Re-fetch when filters change
    fetchProduct();
  }, []);
  const handelSearchClear = () => {
    setShowSearchBtn(false);
    setSearchData("");
    setShowDropdown(false);
  };
  const handelSearch = async () => {
    if (!searchData.trim()) {
      setSearchResult([]);
      setShowDropdown(false);
      return;
    }
    try {
      const limit = 500;
      const response = await axios.get(
        "http://localhost:8000/product/public-product",
        {
          params: {
            filterProduct: "All",
            searchData,
            limit,
          },
        },
      );
      setSearchResult(response.data);
      setShowDropdown(true);
      setShowSearchBtn(true);
    } catch (err) {
      console.log(err);
    }
  };
  const hadleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSearch();
      handelSearchClear();
    }
  };


  return (
    <nav className="w-full bg-[#01A49E] sticky top-0 z-50 ">
      {/* --- TOP BAR --- */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0 h-20 flex items-center justify-between gap-4 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 ">
          <img
            className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md cursor-pointer hover:shadow-xl transition"
            src={"favicon.ico"}
            alt="logo"
          />
          <h4 className="font-poppins font-bold text-white text-sm md:text-base ">
            MERN-ECOMMERCE
          </h4>
        </Link>

        {/* Search Bar - Hidden on Mobile, visible on MD+ */}
        <div className="hidden lg:flex items-center flex-1 max-w-xl z-40 ">
          <div className="flex-1 h-11 px-5 flex items-center bg-white rounded-l-3xl shadow-md">
            <input
              className="w-full outline-none text-sm"
              onKeyDown={hadleKeyPress}
              onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              type="text"
              placeholder="Search anything"
            />
            {showSearchBtn ? (
              <button
                onClick={handelSearchClear}
                className="text-2xl text-gray-500 cursor-pointer hover:scale-108 "
              >
                <MdClear />
              </button>
            ) : (
              <button
                onClick={handelSearch}
                className="text-2xl text-gray-500 cursor-pointer hover:scale-108 z-60 "
              >
                <IoSearchOutline />
              </button>
            )}
          </div>
          <div className="w-32 h-11 flex items-center bg-white rounded-r-3xl border-l border-gray-200 px-2 shadow-md cursor-pointer hover:shadow-xl transition">
            <select className="w-full font-poppins font-semibold text-sm text-deepdark outline-none bg-transparent">
              <option value="">Categories</option>
              <option value="mens">Mens</option>
              <option value="women">Women</option>
            </select>
          </div>
        </div>
        {/* DROPDOWN RESULTS */}
        {showDropdown && (
          <>
            {/* Transparent overlay to close dropdown when clicking outside */}
            <div
              className="fixed inset-0 z-30"
              onClick={() => setShowDropdown(false)}
            />

            <div className=" w-135 max-h-90 bg-white rounded-b-2xl shadow-2xl border border-gray-100 absolute top-16 left-163 z-50 overflow-hidden overflow-y-auto ">
              {searchResult.length > 0 ? (
                searchResult.map((item) => (
                  <Link
                    key={item._id}
                    href={`/products/${item.slug}`}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-none"
                  >
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="w-12 h-12 rounded object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#01A49E] font-bold">
                        ৳{item.discountPrice}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No products found for "{searchData}"
                </div>
              )}
            </div>
          </>
        )}

        {/* Right Side Icons/Links */}
        <div className="flex items-center gap-2 md:gap-6 ">
          {/* User */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-10 md:h-10 text-xl flex items-center justify-center rounded-full overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-xl transition">
              {userInfo?.avatar ? (
                <Image
                  src={userInfo.avatar}
                  alt="profile Image"
                  width={100}
                  height={100}
                />
              ) : (
                <FaUser className="text-[#01A49E]" />
              )}
            </div>
            <div className="hidden xl:block">
              {userInfo ? (
                <p className="text-[12px] text-white leading-none">
                  {userInfo.userName}
                </p>
              ) : (
                <p className="text-[10px] text-white leading-none">WELCOME</p>
              )}
              {userInfo ? (
                <button
                  onClick={handelLogout}
                  className="font-poppins text-sm font-bold text-white cursor-pointer "
                >
                  LOGOUT
                </button>
              ) : (
                <Link
                  href="/login"
                  className="font-poppins text-sm font-bold text-white cursor-pointer "
                >
                  LOGIN / REGISTER
                </Link>
              )}
            </div>
          </div>

          {/* Cart */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 text-xl flex items-center justify-center rounded-full bg-white relative shadow-md cursor-pointer hover:shadow-xl transition">
              <IoCart className="text-[#01A49E]" />
              <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center font-poppins text-[10px] text-white rounded-full bg-black">
                {cartList?.length || 0}
              </div>
            </div>
            <div className="hidden xl:block">
              <p className="text-[10px] text-white leading-none">CART</p>
              <span className="font-poppins text-sm font-bold text-white">
                ৳ {product?.total || 0}
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button
            className="lg:hidden text-white text-3xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* --- BOTTOM BAR (Secondary Nav) --- */}
      {/* Hidden on screens smaller than LG */}
      <div className="hidden lg:block w-full bg-[#039691] shadow-md ">
        <div className="max-w-7xl mx-auto h-12 flex items-center justify-between font-semibold text-white">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-black transition"
            >
              Home <MdOutlineKeyboardArrowDown />
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-1 hover:text-black transition"
            >
              Product <MdOutlineKeyboardArrowDown />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 hover:text-black transition"
            >
              Contact <MdOutlineKeyboardArrowDown />
            </Link>
          </div>
          <p className="px-4 py-1 font-poppins font-normal border border-white/30 rounded-3xl flex items-center gap-2 text-sm">
            <GiRotaryPhone className="text-xl" />
            Hotline 24/7 <span className="font-semibold">01312389439</span>
          </p>
        </div>
      </div>

      {/* --- MOBILE DRAWER MENU --- */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#039691] border-t border-white/10">
          <div className="flex flex-col p-4 gap-4 text-white font-semibold">
            {/* Mobile Search */}
            <div className="flex bg-white rounded-lg p-2">
              <input
                className="w-full outline-none text-black px-2"
                type="text"
                placeholder="Search..."
              />
              <IoSearchOutline className="text-black text-xl" />
            </div>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-4 border-t border-white/20 text-sm">
              <p>Hotline: 01312389439</p>
            </div>
          </div>
        </div>
      )}
      {/* 3. Connect the Sidebar here */}
      <CartSidebar
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
      />
    </nav>
  );
};

export default Navbar;
