import React from 'react'

const CommonHead = ({commonHeadText,CommonHeadTextSmall}) => {
  return (
    <>
    <h2 className=' font-poppins font-bold text-3xl text-[#01A49E] text-center ' >{commonHeadText} <span className='font-normal text-deepdark '>{CommonHeadTextSmall}</span></h2>
    </>
  )
}

export default CommonHead