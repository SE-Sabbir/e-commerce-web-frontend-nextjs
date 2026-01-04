"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CommonHead from './common/CommonHead'
import axios from 'axios';
import OfferCart from './common/OfferCart';
import SingleCart from './common/SingleCart';
import CategorySkeleton from './skeliton/CategorySkeleton';
import Link from 'next/link';

const PopularCategories = () => {
    const [product , setProduct] = useState([])
    const [productCategory , setProductCategory] = useState([])
    const [loading, setLoading] = useState(true)
        
    const fetchProductCategory =async()=>{
        try{
        const responsecategory = await axios.get("http://localhost:8000/category/all-category")
        setProductCategory(responsecategory.data);
    }
    catch(err){
        console.log(err)
    }finally{
        setLoading(false)
    }
    }
    const fetchProduct = async()=>{
        try{
        const limit = 3;
        const response = await axios.get("http://localhost:8000/product/public-product",{params: {
              filterProduct: "All",
              limit
            }})
        setProduct(response.data);
        }
        catch(err){
            console.log(err)
        }
    }
    // Re-fetch when filters change (Debouncing search is recommended for production)
    useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        fetchProduct();
        fetchProductCategory();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    }, []);

  return (
        <div className='max-w-7xl mx-auto px-2 sm:px-0 mt-15'>
            <CommonHead commonHeadText={'Most popular'} CommonHeadTextSmall={'categories'}/>
            {loading?
            <CategorySkeleton/>
            :
            <div>
                <div className='my-12 flex items-center gap-6 justify-center'>
                    {productCategory.map((item)=>(
                        <Link key={item._id} href={`/products?catId=${item._id}`} >
                            <div key={item._id} className='flex flex-col items-center gap-4 '>
                                <Image className='w-27 h-27 rounded-full bg-black border-2 border-[#88fffb] shadow-md cursor-pointer hover:shadow-xl transition ' width={110} height={110} src={item.categoryImage} alt='category icon' />
                                <p className=' font-poppins font-bold text-sm text-deepdark '>{item.categoryName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='w-full h-103 mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 '>
                    {
                    <OfferCart offerPtitle={'Buy 02 boxes get a Snack Tray'} offerPcupon={'Winter26'}/>
                    }
                    <div className='w-full px-2 sm:px-0 grid grid-cols-2 sm:grid-cols-3'>
                    {
                    product.map((pitem , i)=>(
                    <div key={i} className='py-3'>
                    <SingleCart slug={pitem.slug} key={pitem._id} id={pitem._id} pTitle={pitem.title} pThumbnail={pitem.thumbnail} pImages={pitem.subImages} pDisPrice={pitem.discountPrice} pPrice={pitem.price} />
                    </div> 
                    ))
                    }
                    </div>
                </div>
            </div>
            }
        </div>
  )
}

export default PopularCategories