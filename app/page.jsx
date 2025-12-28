"use client"
import React from 'react'
import Banner from './components/Banner'
import PopularCategories from './components/PopularCategories'
import Recommended from './components/Recommended'
import NewArrival from './components/NewArrival'
import ClearanceSale from './components/ClearanceSale'
import OurService from './components/OurService'
import Footer from './components/Footer'

const page = () => {
    
  return (
    <>
    <div className='w-full h-screen bg-[#FFFFFF]'>
      <Banner/>
      <PopularCategories/>
      <Recommended/>
      <ClearanceSale/>
      <NewArrival/>
      <OurService/>
      <Footer/>
    </div>
    </>
  )
}

export default page