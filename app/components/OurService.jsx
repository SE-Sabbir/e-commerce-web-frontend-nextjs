import React from 'react'
import { GoPaperAirplane } from "react-icons/go";
import { IoIosCard } from "react-icons/io";



const OurService = () => {
  return (
    <div className='w-full h-22 mt-15 bg-[#01A49E]'>
        <div className='max-w-7xl mx-auto h-full flex justify-between'>
            <div className='flex items-center gap-2 text-white '>
                <GoPaperAirplane className=' text-xl mb-1 rotate-320'/>
                <p className='font-poppins font-medium text-base text-white leading-0 '>Free Shipping over $99</p>
            </div>
            <div className='flex items-center gap-2 text-white '>
                <p className='font-poppins font-medium text-base text-white leading-0 '>30 Days money back</p>
            </div>
            <div className='flex items-center gap-2 text-white '>
                <p className='font-poppins font-medium text-base text-white leading-0 '>100% Authentic Products</p>
            </div>
            <div className='flex items-center gap-2 text-white '>
                <IoIosCard className=' text-2xl'/>
                <p className='font-poppins font-medium text-base text-white leading-0 '>Flexiable payment options</p>
            </div>
        </div>
    </div>
  )
}

export default OurService