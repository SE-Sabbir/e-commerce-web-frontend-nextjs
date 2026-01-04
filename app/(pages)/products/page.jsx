"use client"

import SingleCart from "@/app/components/common/SingleCart";
import Footer from "@/app/components/Footer";
import OurService from "@/app/components/OurService";
import ProductCardSkeleton from "@/app/components/skeliton/ProductCardSkeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";



const page = () => {

    // Filter States
    const categories = [
    { name: "All", id: "All" },
    { name: "Panjabi", id: "69213a8ae6e5028295df2062" },
    { name: "Shirt", id: "69213a63e6e5028295df205f" },
    { name: "T-Shirt", id: "69213a8ae6e5028295df2064" },
    { name: "Watch", id: "69457b5142dd7ad3ced5c539" },
    { name: "Lungi", id: "69213a8ae6e5028295df2066" },
    ];

    const [category, setCategory] = useState("All");

    // Fetching data based on filters
    const [product , setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit , setLimit] = useState(20)
    const [sortBy , setSortBy] = useState()
    const [minPrice , setMinPrice] = useState(0)
    const [maxPrice , setMaxPrice] = useState(10000)
    // Handlers to ensure we are working with Numbers, not Strings
    const handleMinChange = (e) => {
      const value = e.target.value === "" ? 0 : Number(e.target.value);
      setMinPrice(value);
    };

    const handleMaxChange = (e) => {
      const value = e.target.value === "" ? 0 : Number(e.target.value);
      setMaxPrice(value);
    };
  
    const fetchProduct =async()=>{
        try{
        const response = await axios.get("http://localhost:8000/product/public-product" ,{params: {
            filterProduct:category,
            limit,
            sortBy,
            minPrice,
            maxPrice
          }})
        setProduct(response.data);
      }
      catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }  
    // Re-fetch when filters change (Debouncing search is recommended for production)
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        fetchProduct();
      }, 300);
  
      return () => clearTimeout(delayDebounceFn);
    }, [sortBy , category , minPrice , maxPrice ]);

  return (
    <>
    <div className="max-w-7xl mx-auto px-2 sm:px-0  py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Our Collection</h1>
          <p className="text-sm text-gray-500">Showing {product.length} products</p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-4">
          <div className="relative inline-block text-left">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
            <IoChevronDown  className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR: Filters --- */}
        <aside className="w-full lg:w-60 shrink-0 space-y-8 ">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
              <LuLayoutGrid size={16} /> Categories
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-md text-sm text-left transition-all
                    ${category === cat.id 
                      ? 'bg-[#01A49E] text-white font-bold' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter (UI only) */}
          <div className="hidden lg:block border-t pt-8">
          <h3 className="text-sm font-bold uppercase mb-4 text-gray-900">Price Range</h3>
          
          {/* 1. Visual readout of selected range */}
          <div className="w-full flex justify-between text-xs font-bold text-[#01A49E] mb-2">
            <span>৳{minPrice.toLocaleString()}</span>
            <span>৳{maxPrice.toLocaleString()}</span>
          </div>

          {/* 2. Range Slider (Controls the Max Price) */}
          <input 
            type="range" 
            min="0"
            max="10000" // Must be a number, not "10000+"
            value={maxPrice} 
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#01A49E] " 
          />

          {/* 3. Number Inputs (Custom Value Selection) */}
          <div className="w-full flex justify-between gap-3 text-xs text-gray-500 mt-6">
            
            {/* Min Price Input */}
            <div className="flex flex-col flex-1 gap-1">
              <label className="font-poppins font-semibold text-gray-700">৳ Min</label>
              <input 
                type="number" 
                value={minPrice}
                onChange={handleMinChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#01A49E] focus:ring-1 focus:ring-[#01A49E] transition-all"
                placeholder="0"
              />
            </div>

            {/* Max Price Input */}
            <div className="flex flex-col flex-1 gap-1">
              <label className="font-poppins font-semibold text-gray-700">৳ Max</label>
              <input 
                type="number" 
                value={maxPrice}
                onChange={handleMaxChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#01A49E] focus:ring-1 focus:ring-[#01A49E] transition-all"
                placeholder="10000"
              />
            </div>

          </div>
          
          {/* Quick Reset Label */}
          <button 
            onClick={() => { setMinPrice(0); setMaxPrice(10000); }}
            className="text-[13px] text-[#01A49E] mt-3 hover:underline underline-offset-2"
          >
            Reset to default
          </button>
        </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <div className='w-full grid grid-cols-2 sm:grid-cols-4'>
                {loading?
                Array.from({ length: 10 }).map((_, i) => (<ProductCardSkeleton key={i} />))
                :
                product.map((pitem , i)=>(
                <div key={i} className='py-3'>
                <SingleCart slug={pitem.slug} key={pitem._id} id={pitem._id} pTitle={pitem.title} pThumbnail={pitem.thumbnail} pImages={pitem.subImages} pDisPrice={pitem.discountPrice} pPrice={pitem.price} />
                </div> 
                ))
                }

          {!loading && product.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">No products found in this category.</p>
              <button onClick={() => setCategory("All")} className="mt-4 text-[#01A49E] font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
      <OurService/>
      <Footer/>
    </>
  );
};

export default page