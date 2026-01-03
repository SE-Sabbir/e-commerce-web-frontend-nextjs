"use client"
import React, { useEffect, useState } from 'react'
import { IoSearchOutline, IoCart, IoMenu, IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import Link from 'next/link';
import CartSidebar from './CartSidebar';
import axios from 'axios';



const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [product , setProduct] = useState(null)
    
    useEffect(() => {
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
            fetchProduct();
        }, []);
    
    const cartList = product?.cartItem?.cartItem || []

  return (
    <nav className='w-full bg-[#01A49E] sticky top-0 z-50'>
            {/* --- TOP BAR --- */}
            <div className='max-w-7xl mx-auto px-4 lg:px-0 h-20 flex items-center justify-between gap-4'>
                
                {/* Logo */}
                <Link href='/' className='flex items-center gap-2 shrink-0'>
                    <img className='w-8 h-8 md:w-10 md:h-10 rounded-full' src={'favicon.ico'} alt="logo" />
                    <h4 className='font-poppins font-bold text-white text-sm md:text-base'>MERN-ECOMMERCE</h4>
                </Link>

                {/* Search Bar - Hidden on Mobile, visible on MD+ */}
                <div className='hidden lg:flex items-center flex-1 max-w-xl'>
                    <div className='flex-1 h-11 px-5 flex items-center bg-white rounded-l-3xl'>
                        <input className='w-full outline-none text-sm' type="text" placeholder='Search anything' />
                        <button className='text-2xl text-gray-500'><IoSearchOutline /></button>
                    </div>
                    <div className='w-32 h-11 flex items-center bg-white rounded-r-3xl border-l border-gray-200 px-2'>
                        <select className='w-full font-poppins font-semibold text-sm text-deepdark outline-none bg-transparent'>
                            <option value="">Categories</option>
                            <option value="mens">Mens</option>
                            <option value="women">Women</option>
                        </select>
                    </div>
                </div>

                {/* Right Side Icons/Links */}
                <div className='flex items-center gap-2 md:gap-6'>
                    {/* User */}
                    <div className='flex items-center gap-2'>
                        <div className='w-9 h-9 md:w-10 md:h-10 text-xl flex items-center justify-center rounded-full bg-white'>
                            <FaUser className='text-[#01A49E]' />
                        </div>
                        <div className='hidden xl:block'>
                            <p className='text-[10px] text-white leading-none'>WELCOME</p>
                            <Link href='/login' className='font-poppins text-sm font-bold text-white'>LOGIN / REGISTER</Link>
                        </div>
                    </div>

                    {/* Cart */}
                    <div onClick={() => setIsCartOpen(true)} className='flex items-center gap-2'>
                        <div className='w-9 h-9 md:w-10 md:h-10 text-xl flex items-center justify-center rounded-full bg-white relative'>
                            <IoCart className='text-[#01A49E]'/>
                            <div className='absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center font-poppins text-[10px] text-white rounded-full bg-black'>
                                {cartList?.length || 0}
                            </div>
                        </div>
                        <div className='hidden xl:block'>
                            <p className='text-[10px] text-white leading-none'>CART</p>
                            <span className='font-poppins text-sm font-bold text-white'>৳ {product?.total || 0}</span>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle (Hamburger) */}
                    <button 
                        className='lg:hidden text-white text-3xl'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <IoClose /> : <IoMenu />}
                    </button>
                </div>
            </div>

            {/* --- BOTTOM BAR (Secondary Nav) --- */}
            {/* Hidden on screens smaller than LG */}
            <div className='hidden lg:block w-full bg-[#039691]'>
                <div className='max-w-7xl mx-auto h-12 flex items-center justify-between font-semibold text-white'>
                    <div className='flex items-center gap-10'>
                        <Link href='/' className='flex items-center gap-1 hover:text-black transition'>Home <MdOutlineKeyboardArrowDown/></Link>
                        <Link href='/products' className='flex items-center gap-1 hover:text-black transition'>Product <MdOutlineKeyboardArrowDown/></Link>
                        <Link href='/contact' className='flex items-center gap-1 hover:text-black transition'>Contact <MdOutlineKeyboardArrowDown/></Link>
                    </div>
                    <p className='px-4 py-1 font-poppins font-normal border border-white/30 rounded-3xl flex items-center gap-2 text-sm'>
                        <GiRotaryPhone className='text-xl'/>Hotline 24/7 <span className='font-semibold'>01312389439</span>
                    </p>
                </div>
            </div>

            {/* --- MOBILE DRAWER MENU --- */}
            {isMenuOpen && (
                <div className='lg:hidden bg-[#039691] border-t border-white/10'>
                    <div className='flex flex-col p-4 gap-4 text-white font-semibold'>
                        {/* Mobile Search */}
                        <div className='flex bg-white rounded-lg p-2'>
                            <input className='w-full outline-none text-black px-2' type="text" placeholder='Search...' />
                            <IoSearchOutline className='text-black text-xl' />
                        </div>
                        <Link href='/' onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href='/products' onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link href='/contact' onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <div className='pt-4 border-t border-white/20 text-sm'>
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
        
  )
}

export default Navbar