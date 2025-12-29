"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Link from 'next/link';


const page = () => {
    const [showPass , setShowPass]=useState(false)
    const togglePassVisibility = ()=>{
        setShowPass(!showPass)
    }
  return (
    <div className='max-w-7xl mx-auto mt-50 flex items-center justify-between'>
        <Image width={400} height={400} src='/group3653.png' alt='auth icon' className='w-auto h-auto'/>
        <div>
            <h2 className=' pt-5 font-poppins font-semibold text-3xl text-[#01A49E] '>Welcome Back</h2>
            <h3 className=' pt-2 font-poppins font-normal text-sm text-deepdark uppercase '>login to continue</h3>
            {/* Form */}
            <form>
                <div>
                    <div className='mt-7'>
                        <label className='font-poppins font-normal text-deepdark'>Email Address</label>
                        <div className='w-120 py-4 mt-3 border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type="email"
                        placeholder='Example@gmail.com'
                        required
                        />
                        </div>
                    </div>
                    <div className='mt-6'>
                        <label className='font-poppins font-normal text-deepdark'>Password</label>
                        <div className='w-120 py-4 mt-3 flex items-center justify-between border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type={showPass? "text" :"password"}
                        placeholder='6-12 letter'
                        required
                        />
                        <button onClick={togglePassVisibility} type='button' className=' active:text-deepdark '>
                        {showPass?
                        <IoEyeOffOutline className='mr-4 text-2xl'/>
                        :
                        <IoEyeOutline className='mr-4 text-2xl'/>
                        }
                        </button>
                        </div>
                    </div>
                    <p className='mt-2 font-poppins font-light text-sm text-deepdark underline cursor-pointer'>Forget Password ?</p>
                </div>
                <div className='mt-6'>
                    <button type='submit' className='px-10 py-4 font-poppins font-normal text-base text-white rounded-md bg-[#01A49E] cursor-pointer active:scale-105 active:bg-[#02807b] '>LOGIN</button>
                </div>
            </form>
            <p className='mt-4 font-poppins font-normal text-base text-deepdark cursor-pointer' >NEW USER ? <Link href='/register' className=' text-[#01A49E]'>Register</Link></p>
        </div>
    </div>
  )
}

export default page