"use client"
import SingleCartWithButton from "@/app/components/common/SingleCartWithButton";
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
  
    const fetchProduct =async()=>{
        try{
        const response = await axios.get("http://localhost:8000/product/public-product" ,{params: {
            filterProduct:category,
            limit,
            sortBy
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
    }, [sortBy , category]);

  return (
    <div className="max-w-7xl mx-auto py-8">
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
                      ? 'bg-indigo-600 text-white font-bold' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter (UI only) */}
          <div className="hidden lg:block border-t pt-8">
            <h3 className="text-sm font-bold uppercase mb-4">Price Range</h3>
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>৳0</span>
              <span>৳10,000+</span>
            </div>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <div className='w-full grid lg:grid-cols-4 sm:grid-cols-1 gap-4 '>
                {loading?
                Array.from({ length: 10 }).map((_, i) => (<ProductCardSkeleton key={i} />))
                :
                product.map((pitem , i)=>(
                <div key={i} className='py-5'>
                <SingleCartWithButton slug={pitem.slug} key={pitem._id} id={pitem._id} pTitle={pitem.title} pThumbnail={pitem.thumbnail} pImages={pitem.subImages} pDisPrice={pitem.discountPrice} pPrice={pitem.price} />
                </div> 
                ))
                }

          {!loading && product.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">No products found in this category.</p>
              <button onClick={() => setCategory("All")} className="mt-4 text-indigo-600 font-bold">Clear Filters</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// Reusable Product Card Component
const ProductCard = ({ item }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 border">
        {/* Discount Badge */}
        {item.discountPrice < item.price && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
            {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
          </span>
        )}
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Quick Add Button */}
        <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur py-2 rounded-lg text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
          QUICK ADD
        </button>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-700 truncate">{item.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-gray-900">৳{item.discountPrice}</span>
          {item.discountPrice < item.price && (
            <span className="text-xs text-gray-400 line-through">৳{item.price}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default page