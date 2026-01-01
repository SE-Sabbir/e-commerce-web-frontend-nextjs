import React from 'react'

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 bg-white animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          
          {/* Thumbnails */}
          <div className="order-2 md:order-1 flex md:flex-col gap-3 md:w-20 lg:w-24">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-20 md:w-full aspect-3/4 bg-gray-200 rounded-md"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="order-1 md:order-2 flex-1 aspect-square bg-gray-200 rounded-xl relative">
            <div className="absolute top-4 left-4 w-24 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="lg:col-span-5 space-y-6">

          {/* Title + SKU */}
          <div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-40" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <div className="h-8 w-28 bg-gray-200 rounded" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
          </div>

          <hr className="border-gray-100" />

          {/* Size Variants */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-16 bg-gray-200 rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Stock Info */}
          <div className="h-4 w-48 bg-gray-200 rounded" />

          {/* Quantity */}
          <div className="space-y-3">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-12 w-40 bg-gray-200 rounded-lg" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex gap-3">
              <div className="flex-2 h-14 bg-gray-300 rounded-lg w-full" />
              <div className="flex-1 h-14 bg-gray-200 rounded-lg" />
            </div>
            <div className="h-14 bg-gray-300 rounded-lg w-full" />
          </div>

          {/* Delivery Box */}
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <div className="h-4 w-48 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton