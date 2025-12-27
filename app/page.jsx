"use client"
import React from 'react'
import Banner from './components/Banner'
import PopularCategories from './components/PopularCategories'
import Recommended from './components/Recommended'

const page = () => {
    
  return (
    <>
    <div className='w-full h-screen bg-[#FFFFFF]'>
      <Banner/>
      <PopularCategories/>
      <Recommended/>
    </div>
    </>
  )
}

export default page