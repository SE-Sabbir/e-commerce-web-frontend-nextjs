import React from 'react'
import CommonHead from './common/CommonHead'
import CommonButton from './common/CommonButton'
import OfferCart from './common/OfferCart'
import SingleCart from './common/SingleCart'

const NewArrival = () => {
  return (
        <div className='max-w-7xl mx-auto mt-15'>
        <CommonHead commonHeadText={"New"} CommonHeadTextSmall={"Arrival"}/>
            <div className='py-10 flex items-center gap-5'>
                <CommonButton buttontext={"Featured"}/>
                <CommonButton buttontext={"Featured"}/>
                <CommonButton buttontext={"Featured"}/>
            </div>
            <div className='w-full flex justify-center gap-5'>
                <OfferCart/>
                <div className='w-full flex justify-between'>
                    <SingleCart/>
                    <SingleCart/>
                    <SingleCart/>
                </div>
            </div>
        </div>
  )
}

export default NewArrival