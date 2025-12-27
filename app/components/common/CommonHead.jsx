import React from 'react'

const CommonHead = ({commonHeadText,CommonHeadTextSmall}) => {
  return (
    <>
    <h2 className='font-bold text-3xl text-[#01A49E] text-center' >{commonHeadText} <span className='font-normal text-black'>{CommonHeadTextSmall}</span></h2>
    </>
  )
}

export default CommonHead