import React from 'react'
import Image from 'next/image'
import CommonHead from './common/CommonHead'
import SingleCart from './common/SingleCart'
import CommonButton from './common/CommonButton'

const Recommended = () => {
  return (
    <div className='mt-15'>
        <CommonHead commonHeadText={"Recommended"} CommonHeadTextSmall={"by Swatbabymall"} />
        <div className='max-w-7xl mx-auto'>
            <div className='py-10 flex items-center justify-center gap-4'>
                <CommonButton/>
                <CommonButton/>
                <CommonButton/>
                <CommonButton/>
                <CommonButton/>
                <CommonButton/>
                <CommonButton/>
            </div>
            <div className='w-full flex items-center justify-between'>
                <SingleCart/>
                <SingleCart/>
                <SingleCart/>
                <SingleCart/>
                <SingleCart/>
            </div>
        </div>
    </div>
  )
}

export default Recommended