"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';



const page = () => {
    const navigate = useRouter()
    const [showPass , setShowPass] = useState(false)
    const [errorMessage , setErrorMessage] = useState("")
    const [userData , setUserData] = useState(null)
    const [formData , setFormData] = useState({
        email:"",
        password:""
    })
    const togglePassVisibility = ()=>{
        setShowPass(!showPass)
    }
    const handelSubmit =async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:8000/auth/login", formData)
            setUserData(response.data)
            const authToken = response.data?.accessToken;

            if(authToken){
                localStorage.setItem("authToken", authToken);
                localStorage.setItem("userInfo" ,JSON.stringify(response.data))
                window.dispatchEvent(new Event("authChanged")); // Notify other tabs about the change
            }
            navigate.push("/")
        }
        catch(err){
            console.log(err)
            const errorMessage = err.response?.data?.message;
            setErrorMessage(errorMessage)
        }
    }

  return (
    <div className='w-full max-w-7xl mx-auto mt-10 sm:mt-40 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center justify-center px-2 sm:px-0'>
        <Image width={400} height={400} src='/group3653.png' alt='auth icon' className='w-auto h-auto  mx-auto '/>
        <div>
            <h2 className=' pt-5 font-poppins font-semibold text-center sm:text-left text-3xl text-[#01A49E] '>Welcome Back</h2>
            <h3 className=' pt-2 font-poppins font-normal text-center sm:text-left text-sm text-red-500 uppercase '>{errorMessage}</h3>
            {/* Form */}
            <form onSubmit={handelSubmit}>
                <div>
                    <div className='w-full mt-7'>
                        <label className='font-poppins font-normal text-deepdark'>Email Address</label>
                        <div className='w-full py-4 mt-3 border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type="email"
                        placeholder='Example@gmail.com'
                        onChange={(e)=>setFormData({...formData,email:e.target.value})}
                        required
                        />
                        </div>
                    </div>
                    <div className='w-full mt-6'>
                        <label className='font-poppins font-normal text-deepdark'>Password</label>
                        <div className='w-full py-4 mt-3 flex items-center justify-between border border-[#01A49E] rounded-md'>
                        <input
                        className='w-full px-3 outline-none'
                        type={showPass? "text" :"password"}
                        placeholder='6-12 letter'
                        onChange={(e)=>setFormData({...formData,password:e.target.value})}
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
                <div className='w-full flex justify-center sm:block mt-6'>
                    <button type='submit' className='px-10 py-4 font-poppins font-normal text-base text-white rounded-md bg-[#01A49E] cursor-pointer active:scale-105 active:bg-[#02807b] '>LOGIN</button>
                </div>
            </form>
            <p className='mt-4 font-poppins font-normal text-center sm:text-left text-base text-deepdark cursor-pointer' >NEW USER ? <Link href='/register' className=' text-[#01A49E]'>Register</Link></p>
        </div>
    </div>
  )
}

export default page