"use client"
import React, { useEffect, useState } from 'react'
import CommonHead from './common/CommonHead'
import CommonButton from './common/CommonButton'
import axios from 'axios'
import SingleCart from './common/SingleCart'
import ProductCardSkeleton from './skeliton/ProductCardSkeleton'

const Recommended = () => {
    const [product , setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit , setLimit] = useState(10)

  const fetchProduct =async()=>{
      try{
      const response = await axios.get("http://localhost:8000/product/public-product" ,{params: {
          filterProduct: "all",
          limit,
        }})
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
        <div className='max-w-7xl mx-auto mt-15 text-center'>
        <CommonHead commonHeadText={"Recommended"} CommonHeadTextSmall={"by E-Commerce"} />
            <div className='py-10 flex items-center justify-center gap-4'>
                <CommonButton buttontext={"Best Seller"}/>
                <CommonButton buttontext={"Top Rated"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
                <CommonButton buttontext={"New"}/>
            </div>
            <div className='w-full flex flex-wrap items-center justify-between gap-3'>
                {loading?
                Array.from({ length: 10 }).map((_, i) => (<ProductCardSkeleton key={i} />))
                :
                product.map((pitem , i)=>(
                <div key={i} className='py-3'>
                <SingleCart slug={pitem.slug} key={pitem._id} id={pitem._id} pTitle={pitem.title} pThumbnail={pitem.thumbnail} pImages={pitem.subImages} pDisPrice={pitem.discountPrice} pPrice={pitem.price} />
                </div> 
                ))
                }
            </div>
        </div>
  )
}

export default Recommended