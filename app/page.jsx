"use client"
import React from 'react'
import { useState } from 'react';
import { Carousel, Radio } from 'antd';
const contentStyle = {
  margin: 0,
  height: '450px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const page = () => {
    
  return (
    <>
    <div className='w-full h-screen bg-[#F0E7D9]'>
        <div className='max-w-7xl mx-auto '>
       <Carousel autoplay >
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
        </div>
    </div>
    </>
  )
}

export default page