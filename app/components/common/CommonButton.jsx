import React from 'react'

const CommonButton = ({buttontext}) => {
  return (
    <>
    <button className='px-4 py-2 rounded-lg font-poppins font-semibold text-sm text-white bg-[#01A49E]'>{buttontext}</button>
    </>
  )
}

export default CommonButton