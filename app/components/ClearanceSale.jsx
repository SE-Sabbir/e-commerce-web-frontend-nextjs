import React, { useEffect, useState } from 'react'
import CommonHead from './common/CommonHead'
import SingleCart from './common/SingleCart'
import axios from 'axios'
import ProductCardSkeleton from './skeliton/ProductCardSkeleton'

const ClearanceSale = () => {
  const [product , setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit , setLimit] = useState(5)
  const [sortBy , setSortBy] = useState('lowToHigh')

  const fetchProduct =async()=>{
      try{
      const response = await axios.get("http://localhost:8000/product/public-product" ,{params: {
          filterProduct: "All",
          limit,
          sortBy
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
    <div className='max-w-7xl mx-auto mt-15'>
        <CommonHead commonHeadText={"Clearance"} CommonHeadTextSmall={"Sale | Up to 70% OFF"}/>
        <div className='w-full px-2 sm:px-0 grid grid-cols-2 sm:grid-cols-5'>
                {loading?
                Array.from({ length: 5 }).map((_, i) => (<ProductCardSkeleton key={i} />))
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

export default ClearanceSale