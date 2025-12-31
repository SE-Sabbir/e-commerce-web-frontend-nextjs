"use client"
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
    const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    // Function to fetch data from Node.js
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/single-product/mens-premium-panjabi-aarish`);
        const data = await response.json();
        console.log(data)
        setProduct(data);
        setActiveImg(data.subImages[0]); // Set initial big image
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);


  if (loading) return <div className="p-10 text-center">Loading product...</div>;
  if (!product) return <div className="p-10 text-center">Product not found.</div>;
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Thumbnail Sidebar */}
      <div className="flex md:flex-col gap-3">
        {product.subImages.map((img, index) => (
          <img 
            key={index}
            src={img} 
            onClick={() => setActiveImg(img)}
            className={`w-20 h-28 cursor-pointer border-2 ${activeImg === img ? 'border-indigo-600' : 'border-transparent'}`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img src={activeImg} className="w-full aspect-[3/4] object-cover rounded-lg" />
        <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
        <p className="text-xl text-indigo-600">BDT {product.price}</p>
      </div>
    </div>
  )
}

export default page