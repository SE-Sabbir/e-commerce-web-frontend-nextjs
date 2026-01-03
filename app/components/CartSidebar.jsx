"use client";
import React, { useEffect, useState } from 'react';
import { IoClose, IoTrashOutline } from "react-icons/io5";
import Link from 'next/link';
import axios from 'axios';

const CartSidebar = ({ isOpen, setIsOpen }) => {
    const [product , setProduct] = useState(null)
    const cartList = product?.cartItem?.cartItem || []

    const fetchProduct =async()=>{
        try{
        const response = await axios.get(`http://localhost:8000/cart/get-cart`,{
            params:{creatorId:'6909bab7ec77eeef7168a39b'}
        })
        setProduct(response.data);
        }
        catch(err){
        console.log(err)
        }
    }  
    // Re-fetch when filters change
    useEffect(() => {
        fetchProduct();
    }, []);

    const handeldelete = async (itemId) => {
    try {
        const deleteData = {
        data: {
            creatorId: '6909bab7ec77eeef7168a39b',
            productId: itemId // The specific ID of the product to remove
        }
        };
        
        await axios.delete(`http://localhost:8000/cart/delete-cart`, deleteData);
        
        // Refresh the list immediately after deleting
        fetchProduct();
    } catch (err) {
        console.error("Delete failed:", err);
    }
    };


  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-15 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-100 bg-white z-15 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Shopping Cart ({cartList?.length || 0})</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl p-1 hover:bg-gray-100 rounded-full transition">
            <IoClose />
          </button>
        </div>

        {/* Product List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 h-[calc(100vh-280px)]">
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-4">
                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img src={item.productId.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.productId.title}</h3>
                    <p className="text-sm text-gray-500"><strong>Size:</strong> {item.varient} | <strong>Qty:</strong> {item.qty}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[#01A49E] font-bold">৳{item.productId.discountPrice}</p>
                    <button onClick={()=>handeldelete(item._id)} className="text-red-500 hover:text-red-700 text-lg">
                      <IoTrashOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Footer (Pricing & Buttons) */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gray-50 border-t space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-gray-600">Subtotal:</span>
            <span className="font-bold text-gray-900">৳({product?.total || 0 })</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* View Cart Button */}
            <Link 
              href="/cart" 
              onClick={() => setIsOpen(false)}
              className="w-full h-12 flex items-center justify-center border-2 border-[#01A49E] text-[#01A49E] font-bold rounded-lg hover:bg-[#01A49E]/5 transition"
            >
              VIEW CART PAGE
            </Link>

            {/* Checkout / Order Button */}
            <Link 
              href="/checkout" 
              onClick={() => setIsOpen(false)}
              className="w-full h-12 flex items-center justify-center bg-[#01A49E] text-white font-bold rounded-lg hover:bg-[#01938d] shadow-lg shadow-[#01A49E]/20 transition"
            >
              PROCEED TO ORDER
            </Link>
          </div>
          
          <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
            Secure checkout powered by MERN
          </p>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;