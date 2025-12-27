import React from 'react'
import Image from 'next/image'
import { Rate } from 'antd';
import { FaRegHeart } from "react-icons/fa6";
import { Carousel } from 'antd';

const SingleCart = () => {
  return (
    <>
    <div className='w-61 h-102 rounded-2xl border border-[#CCCCCC] shadow-md'>
        <div className='m-5 flex flex-col items-center'>
        <h2 className='font-semibold text-sm text-center mb-3'>Choco Baby Bouncer Balloonup to a weight of 18 kg</h2>
        <Rate size='small' disabled defaultValue={4} />
        <div className='w-full h-56'>
        <Carousel autoplay>
        <div>
            <Image width={204} height={200} src='/prod2.png' alt='cart product' />
        </div>
        <div>
            <Image width={204} height={200} src='/prod2.png' alt='cart product' />
        </div>
        </Carousel>
        </div>
        <h3 className='w-full flex items-center gap-2 font-semibold text-xl text-[#EB4227]'>$123.00 <span className=' text-sm text-[#666666] line-through '>$150.00</span></h3>
        <div className='w-full flex items-end justify-between'>
        <p className='pt-4 font-normal text-sm text-[#666666]'><span className='font-semibold text-black'>1286 </span>Purchases</p>
        <FaRegHeart/>
        </div>
        </div>
    </div>
    </>
  )
}

export default SingleCart