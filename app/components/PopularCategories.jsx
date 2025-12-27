import React from 'react'
import Image from 'next/image';
import CommonHead from './common/CommonHead'

const PopularCategories = () => {
  return (
    <div className='mt-15'>
        <CommonHead commonHeadText={'Most popular categories'} CommonHeadTextSmall={'for baby products'}/>
        <div className='max-w-7xl mx-auto'>
            <div className='my-12 flex items-center justify-between'>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
                <div className='flex flex-col items-center'>
                    <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src="/newall.png" />
                    <p className='pt-5 font-bold text-sm'>New Arrivals</p>
                </div>
            </div>
            <div className='w-full flex items-center justify-between'>
                <Image className='w-158 rounded-xl' width={640} height={230} src="/productbanner.png" alt="product banner"/>
                <Image className='w-158 rounded-xl' width={640} height={230} src="/offerbanner.png" alt="discount banner"/>
            </div>
        </div>
    </div>
  )
}

export default PopularCategories