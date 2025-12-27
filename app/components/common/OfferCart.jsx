import React from 'react'
import Image from 'next/image'
import { Rate } from 'antd';
import { FaRegHeart } from "react-icons/fa6";
import { Carousel } from 'antd';
import { PiGift } from "react-icons/pi";

const OfferCart = () => {
  return (
    <>
    <div className='w-132 h-103 flex flex-col items-center rounded-2xl border border-[#CCCCCC] shadow-md'>
        <div className='m-5 flex items-center'>
            <div className='w-50 h-50'>
            <Carousel autoplay>
            <div>
                <Image width={204} height={200} src='/prod2.png' alt='cart product' />
            </div>
            <div>
                <Image width={204} height={200} src='/prod2.png' alt='cart product' />
            </div>
            </Carousel>
            </div>
            <div className='w-full'>
                <h2 className='font-poppins font-semibold text-sm text-deepdark mb-3'>Choco Baby Bouncer Balloonup to a weight of 18 kg</h2>
                <Rate size='small' disabled defaultValue={4} />
                <h3 className='w-full flex items-center gap-2 font-poppins font-semibold text-xl text-[#EB4227]'>$123.00 <span className=' text-sm text-[#666666] line-through '>$150.00</span></h3>
                <div className='w-full flex items-end justify-between'>
                    <p className='pt-4 font-poppins font-normal text-sm text-[#666666]'><span className='font-semibold text-deepdark'>1286 </span>Purchases</p>
                    <FaRegHeart/>
                </div>
            </div>
        </div>
        <div className='w-121 h-33 flex items-center justify-around bg-[#F9F1E4]'>
            <PiGift className='text-8xl text-[#f87a7a] rotate-15'/>
            <div>
            <p className='font-poppins font-semibold text-base text-deepdark '> Buy 02 boxes get a Snack Tray</p>
            <h3 className='font-poppins font-bold text-2xl text-deepdark uppercase'>Cupons:Winter26</h3>
            </div>
        </div>
    </div>
    </>
  )
}

export default OfferCart