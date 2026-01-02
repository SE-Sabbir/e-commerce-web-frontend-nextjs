import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import CommonHead from './common/CommonHead'
import axios from 'axios';
import CategorySkeleton from './skeliton/CategorySkeleton';

const PopularCategories = () => {
    const [product , setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit , setLimit] = useState(10)
    const [page , setPage] = useState(2)
        
    const fetchProduct =async()=>{
        try{
        const response = await axios.get("http://localhost:8000/category/all-category")
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
            <CommonHead commonHeadText={'Most popular categories'} CommonHeadTextSmall={'for baby products'}/>
            {loading?
            <CategorySkeleton/>
            :
            <div>
                <div className='my-12 flex items-center gap-6 justify-center'>
                    {product.map((item)=>(
                            <div key={item._id} className='flex flex-col items-center gap-4'>
                                <Image className='w-27 h-27 rounded-full bg-black' width={110} height={110} src={item.categoryImage} alt='category icon' />
                                <p className=' font-poppins font-bold text-sm text-deepdark '>{item.categoryName}</p>
                            </div>
                    ))}
                </div>
                <div className='w-full flex items-center justify-between'>
                    <Image className='w-158 rounded-xl' width={640} height={230} src="/productbanner.png" alt="product banner"/>
                    <Image className='w-158 rounded-xl' width={640} height={230} src="/offerbanner.png" alt="discount banner"/>
                </div>
            </div>
            }
        </div>
  )
}

export default PopularCategories