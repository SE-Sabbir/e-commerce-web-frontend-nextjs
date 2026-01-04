import React from 'react'
import { GoPaperAirplane } from "react-icons/go";
import { IoIosCard } from "react-icons/io";



const OurService = () => {
  return (
    <div className='w-full mt-15 bg-[#01A49E] shadow-md '>
        <div className='max-w-7xl mx-auto py-7 flex flex-wrap items-center justify-center sm:justify-between gap-2 '>
            <div className='flex items-center gap-2 text-white '>
                <GoPaperAirplane className=' text-xl mb-1 rotate-320'/>
                <p className='font-poppins font-medium text-base text-white'>Free Shipping over $99</p>
            </div>
            <div className='flex items-center gap-2 text-white '>
                <p className='font-poppins font-medium text-base text-white'>30 Days money back gerunty </p>
            </div>
            <div className='flex items-center gap-2 text-white '>
                <p className='font-poppins font-medium text-base text-white'>100% Authentic Products</p>
            </div>
            <div className='flex items-center gap-2 text-white '>
                <IoIosCard className=' text-2xl'/>
                <p className='font-poppins font-medium text-base text-white'>Flexiable payment options</p>
            </div>
        </div>
    </div>
  )
}

export default OurService