"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Link from 'next/link';


const page = () => {
    const [showPass , setShowPass]=useState(false)
    const [showConPass , setConShowPass]=useState(false)
    const togglePassVisibility = ()=>{
        setShowPass(!showPass)
    }
    const toggleConPassVisibility = ()=>{
        setConShowPass(!showConPass)
    }
  return (
    <div className='w-full max-w-7xl mx-auto mt-5 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center justify-center px-2 sm:px-0'>
        <Image width={400} height={400} src='/group3653.png' alt='auth icon' className='w-auto h-auto mx-auto hidden sm:block '/>
        <div>
            <h2 className=' pt-5 font-poppins font-semibold text-center sm:text-left text-3xl text-[#01A49E] '>Register Form</h2>
            {/* Form */}
            <form>
                <div>
                    <div className='mt-7'>
                        <label className='font-poppins font-normal text-deepdark'>Your Name</label>
                        <div className='w-full py-4 mt-3 border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type="text"
                        placeholder='Full name'
                        required
                        />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label className='font-poppins font-normal text-deepdark'>Email Address</label>
                        <div className='w-full py-4 mt-3 border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type="email"
                        placeholder='Example@gmail.com'
                        required
                        />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label className='font-poppins font-normal text-deepdark'>Phone</label>
                        <div className='w-full py-4 mt-3 border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type="email"
                        placeholder='(+880)'
                        required
                        />
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-2'>
                    <div className='mt-4'>
                        <label className='font-poppins font-normal text-deepdark'>Password</label>
                        <div className='w-full py-4 mt-3 flex items-center justify-between border border-[#01A49E] rounded-md'>
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
                    <div className='mt-4'>
                        <label className='font-poppins font-normal text-deepdark'>Confirme Password</label>
                        <div className='w-full py-4 mt-3 flex items-center justify-between border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type={showConPass? "text" :"password"}
                        placeholder='6-12 letter'
                        required
                        />
                        <button onClick={toggleConPassVisibility} type='button' className=' active:text-deepdark '>
                        {showConPass?
                        <IoEyeOffOutline className='mr-4 text-2xl'/>
                        :
                        <IoEyeOutline className='mr-4 text-2xl'/>
                        }
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='w-full justify-center flex sm:block mt-4'>
                    <button type='submit' className='px-10 py-4 font-poppins font-normal text-base text-white rounded-md bg-[#01A49E] cursor-pointer active:scale-105 active:bg-[#02807b] '>REGISTER</button>
                </div>
            </form>
            <p className='mt-4 mb-20 font-poppins font-normal text-center sm:text-left text-base text-deepdark cursor-pointer' >Already have an Account ? <Link href='/login' className=' text-[#01A49E]'>Login</Link></p>
        </div>
    </div>
  )
}

export default page