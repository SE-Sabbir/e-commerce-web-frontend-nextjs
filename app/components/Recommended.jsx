import React from 'react'
import Image from 'next/image'
import CommonHead from './common/CommonHead'
import SingleCart from './common/SingleCart'
import CommonButton from './common/CommonButton'

const Recommended = () => {
  return (
        <div className='max-w-7xl mx-auto mt-15 text-center'>
        <CommonHead commonHeadText={"Recommended"} CommonHeadTextSmall={"by E-Commerce"} />
            <div className='py-10 flex items-center justify-center gap-4'>
                <CommonButton buttontext={"Best Seller"}/>
                <CommonButton buttontext={"Top Rated"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
            </div>
            <div className='w-full flex items-center justify-between'>
                <SingleCart/>
                <SingleCart/>
                <SingleCart/>
                <SingleCart/>
                <SingleCart/>
            </div>
        </div>
  )
}

export default Recommended