import React from 'react'
import CommonHead from './common/CommonHead'
import SingleCart from './common/SingleCart'

const ClearanceSale = () => {
  return (
    <div className='max-w-7xl mx-auto mt-15'>
        <CommonHead commonHeadText={"Clearance"} CommonHeadTextSmall={"Sale | Up to 70% OFF"}/>
        <div className='py-10'>
            <SingleCart/>
        </div>
    </div>
  )
}

export default ClearanceSale