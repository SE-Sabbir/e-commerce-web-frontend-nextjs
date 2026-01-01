import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="w-61 h-102 rounded-2xl border border-gray-200 p-4 animate-pulse">
      {/* Title */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-3" />

      {/* Rating */}
      <div className="h-3 bg-gray-300 rounded w-20 mx-auto mb-4" />

      {/* Image */}
      <div className="h-56 bg-gray-300 rounded-xl mb-4" />

      {/* Price */}
      <div className="h-5 bg-gray-300 rounded w-32 mb-3" />

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="h-3 bg-gray-300 rounded w-24" />
        <div className="h-6 w-6 bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton