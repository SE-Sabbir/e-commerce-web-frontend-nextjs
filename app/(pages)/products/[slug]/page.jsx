"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HiShoppingCart } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import ProductDetailsSkeleton from '@/app/components/skeliton/ProductDetailsSkeleton';
import { showToast } from "@/app/components/ToastProvider";



const page = () => {
    const {slug} = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [userInfo, setUserInfo] = useState(null);
    const searchParams = useSearchParams();
        
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

    // Logic to handle increment/decrement
    const handleIncrement = () => {
        if (quantity < product.stock) {
        setQuantity(prev => prev + 1);
        }
    };
    const handleDecrement = () => {
        if (quantity > 1) {
        setQuantity(prev => prev - 1);
        }
    };
    

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/single-product/${slug}`);
            const data = response.data;
            setProduct(data);
            // Start with the thumbnail as the main image
            setActiveImg(data.thumbnail);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };
        fetchProduct();
    }, []);

    
    const handelsubmit =async(e)=>{
      const creatorId = userInfo?.userId || userInfo?._id || userInfo?.id;
      if (!creatorId) {
        showToast("Please sign in before adding items to your cart.", "error");
        return;
      }

      try{
        const cartData = {
          creatorId,
          cartItem:[{
            productId:product._id,
            varient:selectedSize,
            qty:quantity
          }]
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add-to-cart`,cartData)
        window.dispatchEvent(new Event("cartUpdated"));
        showToast("Product added to your cart.");
      }catch(err){
        console.log(err)
        showToast("Please Select a size", "error");
      }
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 bg-white">
        {loading?
        <ProductDetailsSkeleton/>
        :
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT: Image Gallery (7 Columns) --- */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          {/* Thumbnails Sidebar */}
          <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:w-20 lg:w-24">
            {/* Include Thumbnail in the list */}
            {[product.thumbnail, ...product.subImages].map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImg(img)}
                className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all aspect-3/4 flex shrink-0 w-20 md:w-full
                  ${activeImg === img ? 'border-indigo-600' : 'border-transparent hover:border-gray-200'}`}
              >
                <img src={img} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Large Display Image */}
          <div className="order-1 md:order-2 flex-1 rounded-xl overflow-hidden bg-gray-50 border relative">
            <img src={activeImg} alt={product.title} className="w-full aspect-square object-cover object-top" />
          </div>
        </div>

        {/* --- RIGHT: Product Info & Actions (5 Columns) --- */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.title}</h1>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mb-1">SKU: {product.SKU}</p>
          </div>

          {/* Pricing Section */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-[#01A49E]">৳{product.discountPrice}</span>
            <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
          </div>

          <hr className="border-gray-100" />

          {/* Variant/Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="font-bold text-gray-800">Select Size</label>
              <button className="text-sm text-indigo-600 hover:underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.varient.map((vname, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(vname.varientName)}
                  className={`min-w-12 px-4 py-2 rounded-md border-2 font-medium transition-all
                    ${selectedSize === vname.varientName
                      ? 'border-[#01A49E] text-[#01A49E]' 
                      : 'border-gray-200 hover:border-gray-400 text-gray-700'}`}
                >
                  {vname.varientName}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Info */}
          <p className="text-sm text-gray-600">
            Availability: <span className={product.stock > 0 ? 'text-green-600 font-bold' : 'text-red-600'}>
              {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
            </span>
          </p>
          {/* 2. Quantity Selector Section */}
        <div className="space-y-4">
            <label className="font-bold text-gray-800">Quantity</label>
            <div className="mt-1 flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden w-fit">
                <button 
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                <FaMinus size={18} />
                </button>
                
                <div className="w-12 text-center font-bold text-lg select-none">
                {quantity}
                </div>

                <button 
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                <FaPlus size={18} />
                </button>
            </div>
            
            {/* Stock Warning */}
            {product.stock < 10 && product.stock > 0 && (
                <span className="text-sm text-orange-600 font-medium">
                Only {product.stock} left in stock!
                </span>
            )}
            </div>
        </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex gap-3">
              <button onClick={handelsubmit} className="flex-2 text-white h-14 rounded-lg font-bold flex items-center justify-center gap-2 bg-[#01A49E] cursor-pointer active:bg-[#028d88] transition-all active:scale-[0.98]">
                <HiShoppingCart size={20} />
                ADD TO CART
              </button>
              <button className="flex-1 border-2 border-gray-200 h-14 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all">
                <FaRegHeart size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Short Delivery Note */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm space-y-2">
            <p className="flex items-center gap-2">🚚 Delivery within 3-5 days</p>
            <p className="flex items-center gap-2">🔄 7 Days Easy Return</p>
          </div>
        </div>
      </div>
        }
    </div>
  )
}

export default page