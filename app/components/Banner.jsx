import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Carousel } from 'antd';
import BannerSkeleton from './skeliton/BannerSkeleton';
import axios from 'axios';
import Link from 'next/link';

const Banner = () => {
  const [product , setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit , setLimit] = useState(2)

  const fetchProduct =async()=>{
      try{
      const response = await axios.get("http://localhost:8000/product/public-product" ,{params: {
          filterProduct: "All",
          limit,
        }})
      console.log("Banner Products:", response.data)
      setProduct(response.data);
    }
    catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }  
  // Re-fetch when filters change (Debouncing search is recommended for production)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProduct();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, []);

  return (
    <div className='max-w-7xl mx-auto rounded-b-2xl bg-gray-100 shadow-md cursor-pointer hover:shadow-xl transition'>
      {loading?
      <BannerSkeleton/>
      :
      <Carousel autoplay>
      {product.map((item)=>(
        <div key={item._id}>
          <div className='w-full px-4 sm:px-0 h-125 flex items-center justify-around '>
            <div className='relative'>
            <h3 className='font-bold text-lg'>Featured</h3>
            <h4 className='w-72 mt-3 font-semibold text-4xl'>{item.title}</h4>
            <p className='w-35 mt-6 font-normal text-base'>Premium quality product with best comfort & style.</p>
            <Link href={`/products/${item.slug}`}>
            <button className='w-35 h-12 mt-6 font-semibold text-tansform uppercase text-white text-sm rounded-xl bg-[#01A49E] shadow-md cursor-pointer hover:scale-103 transition'>Shop Now</button>
            </Link>
            </div>
              {/* IMAGE */}
            <div className="relative w-130 h-95">
              <Image
                src={item?.thumbnail}
                alt="Banner"
                fill
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 516px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ))}
      </Carousel>
      }
    </div>
  )
}

export default Banner