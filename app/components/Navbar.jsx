import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import Link from 'next/link';



const Navbar = () => {
  return (
    <nav className='w-full bg-[#01A49E]'>
        <div className='max-w-7xl mx-auto h-20 flex items-center justify-between '>
            <Link href='/' className='flex items-center justify-center gap-2'>
                <img className='w-10 h-10 rounded-full overflow-hidden' src={'favicon.ico'} alt="logo" />
                <h4 className='font-poppins font-bold text-white'>MERN-ECOMMERCE</h4>
            </Link>
            <div className='flex items-center justify-center'>
                <div className='w-70 h-11 px-5 flex items-center bg-white rounded-l-3xl '>
                    <input className='w-full outline-none' type="text" placeholder='Search anything' />
                    <button className='text-2xl'>
                    <IoSearchOutline />
                    </button>
                </div>
                <div className='w-35 h-11 flex items-center bg-white rounded-r-3xl border-l border-black-1 '>
                    <select className='font-poppins font-semibold text-sm text-deepdark outline-none'>
                        <option value="">All Categories</option>
                        <option value="">Mens</option>
                        <option value="">Women</option>
                        <option value="">Baby</option>
                    </select>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4'>
                <div className='w-10 h-10 text-2xl flex items-center justify-center rounded-full bg-white'>
                    <FaUser className='text-deepdark' />
                </div>
                <div>
                <p className='text-[11px] text-white'>WELCOME</p>
                <Link href='/login' className=' font-poppins text-[14px] font-bold text-white ' >LOG IN / REGISTER</Link>
                </div>
            </div>
            <div className='flex items-center justify-center gap-4'>
                <div className='w-10 h-10 text-2xl flex items-center justify-center rounded-full bg-white relative'>
                    <IoCart className='text-deepdark'/>
                    <div className='w-5 h-5 mt-7 ml-7 flex items-center justify-center font-poppins text-sm text-white rounded-full bg-deepdark absolute '>
                        <p>5</p>
                    </div>
                </div>
                <div>
                <p className='text-[11px] text-white'>CART</p>
                <button className='font-poppins text-[14px] font-bold text-white ' >$1689.00</button>
                </div>
            </div>
        </div>
        <div className='w-full h-12 bg-[#039691] '>
            <div className=' max-w-7xl mx-auto h-full flex items-center justify-between font-semibold text-white  '>
                <div className='flex items-center gap-10 '>
                <h3 className='flex items-center gap-1'>Home <MdOutlineKeyboardArrowDown className='text-xl'/></h3>
                <h3 className='flex items-center gap-1'>Product <MdOutlineKeyboardArrowDown className='text-xl'/></h3>
                <h3 className='flex items-center gap-1'>Contact <MdOutlineKeyboardArrowDown className='text-xl'/></h3>
                </div>
                <p className='px-3 py-1 font-poppins font-normal border rounded-3xl flex items-center justify-center gap-2'><GiRotaryPhone className='text-2xl'/>Hotline 24/7 <span className='font-semibold'>01312389439</span></p>
            </div>
        </div>
    </nav>
  )
}

export default Navbar