import React from 'react'
import Image from 'next/image';
import { Carousel } from 'antd';

const Banner = () => {

  return (
    <div className='max-w-7xl mx-auto bg-[#F0E7D9]'>
    <Carousel autoplay>
    <div>
      <div className='w-full h-115 flex items-center justify-around'>
        <div className='relative'>
        <h3 className='font-bold text-lg'>Bobolax</h3>
        <h4 className='w-72 mt-3 font-normal text-4xl'><span className='font-bold'>Nutri 7-In-1</span> Base On Formula 400g</h4>
        <p className='w-35 mt-6 font-normal text-base'>Lorem ispum dolor sitamet photo</p>
        <button className='w-35 h-12 mt-6 font-semibold text-tansform uppercase text-white text-sm rounded-xl bg-[#01A49E] cursor-pointer hover:scale-105'>Shop Now</button>
        </div>
          {/* IMAGE */}
        <div className="relative w-129 h-95">
          <Image
            src="/product1.png"
            alt="Banner"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 516px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
    <div>
      <div className='w-full h-115 flex items-center justify-around'>
        <div className=''>
        <h3 className='font-bold text-lg'>Bobolax</h3>
        <h4 className='w-72 mt-3 font-normal text-4xl'><span className='font-bold'>Nutri 7-In-1</span> Base On Formula 400g</h4>
        <p className='w-35 mt-6 font-normal text-base'>Lorem ispum dolor sitamet photo</p>
        <button className='w-35 h-12 mt-6 font-semibold text-tansform uppercase text-white text-sm rounded-xl bg-[#01A49E]'>Shop Now</button>
        </div>
          {/* IMAGE */}
        <div className="relative w-129 h-95">
          <Image
            src="/product1.png"
            alt="Banner"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 516px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  </Carousel>
    </div>
  )
}

export default Banner