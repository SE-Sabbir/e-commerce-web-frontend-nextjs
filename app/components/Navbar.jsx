import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full bg-[#01A49E] '>
        <div className='max-w-7xl mx-auto h-20 flex items-center justify-between '>
            <div>Logo</div>
            <div className='flex items-center justify-center'>
                <div className='w-70 h-11 px-5 flex items-center bg-white rounded-l-3xl '>
                    <input className='w-full outline-none' type="text" placeholder='Search anything' />
                </div>
                <div className='w-35 h-11 flex items-center bg-white rounded-r-3xl border-l border-black-1 '>
                    <select className='outline-none'>
                        <option value="">All Categories</option>
                        <option value="">Mens</option>
                        <option value="">Women</option>
                        <option value="">Baby</option>
                    </select>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-white'></div>
                <div>
                <p>WELCOME</p>
                <button>LOG IN / REGISTER</button>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-white'></div>
                <div>
                <p>WELCOME</p>
                <button>$1689.00</button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar