import React from 'react'
import Image from 'next/image';
import { LuCopyright } from "react-icons/lu";

const Footer = () => {
  return (
    <div className='max-w-7xl mx-auto mt-15 sabbir '>
        <div className='mx-5 sm:mx-0 flex flex-wrap lg:flex-nowrap items-top justify-between gap-5'>
        <div>
            <h4 className='font-poppins font-bold text-lg text-deepdark'>Subscribe & Get <span className='text-[#EB4227]'>10%</span> OFF</h4>
            <div className='w-100 h-10 my-7 flex bg-gray-100 rounded-md '>
                <input className='w-full px-3 outline-none' type="email" placeholder='Email Address' />
                <button className='w-40 h-10 font-poppins font-normal text-sm text-white rounded-r-md bg-[#01A49E] active:scale-105 active:bg-[#028d88] '>subscribe</button>
            </div>
            <p className='font-poppins font-normal text-sm'>By subscribing, you accept the Privacy Policy</p>
            <div className=' mt-7 flex flex-col gap-2 font-normal text-sm text-deepdark'>
                <p><strong>Hotline 24/7:</strong> (+325) 3686 25 16</p>
                <p><strong>Work Hours:</strong> Monday-Saturday: 9.00am - 5.00pm</p>
                <p><strong>Mail:</strong> contact@swatbabymall.com</p>
            </div>
        </div>
        <div className='w-full sm:ml-5 flex flex-wrap justify-between gap-3'>
            <ul className='flex flex-col gap-2 font-poppins font-normal text-sm text-[#666666]'>
                <li className='font-bold text-lg text-deepdark'>Top Categories</li>
                <li>Homewares</li>
                <li>Toys & Study</li>
                <li>Baby Dress</li>
                <li>Mens Shirt</li>
                <li>Mens Punjabi</li>
                <li>Pants</li>
            </ul>
            <ul className='flex flex-col gap-2 font-poppins font-normal text-sm text-[#666666]'>
                <li className='font-bold text-lg text-deepdark'>Company</li>
                <li>About</li>
                <li>Contact</li>
                <li>Career</li>
                <li>Blog</li>
                <li>Sitemap</li>
                <li>Store Locations</li>
            </ul>
            <ul className='flex flex-col gap-2 font-poppins font-normal text-sm text-[#666666]'>
                <li className='font-bold text-lg text-deepdark'>Help Center</li>
                <li>Customer Service</li>
                <li>Policy</li>
                <li>Terms & Conditions</li>
                <li>Track Order</li>
                <li>FAQs</li>
                <li>My Account</li>
                <li>Product Support</li>
            </ul>
        </div>
        </div>
        <div className='py-5 flex items-center justify-center gap-4'>
            <Image width={20} height={10} src='/pay1.png' alt='payicon' className='aspect-auto' />
            <Image width={30} height={10} src='/pay2.png' alt='payicon' className='aspect-auto' />
            <Image width={40} height={10} src='/pay3.png' alt='payicon' className='aspect-auto' />
        </div>
        <div className='py-7 flex items-center justify-center gap-2 border-t-2 border-[#f3eded]'>
            <LuCopyright/>
            <p>2026 <strong>E-Commerce</strong>. All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer