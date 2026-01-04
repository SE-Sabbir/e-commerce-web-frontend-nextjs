import React from 'react'

const CategorySkeleton = () => {
  return (
<div className='max-w-7xl mx-auto px-2 sm:px-0 mt-15 animate-pulse'>
      {/* Category Icons Skeleton */}
      <div className='my-12 flex items-center gap-6 justify-center overflow-hidden'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='flex flex-col items-center gap-4'>
            <div className='w-27 h-27 rounded-full bg-gray-200 border-2 border-gray-100'></div>
            <div className='h-4 w-16 bg-gray-200 rounded'></div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className='w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-4'>
        
        {/* Offer Card Skeleton */}
        <div className='w-full sm:w-87 h-103 bg-gray-200 rounded-xl shrink-0'></div>

        {/* Product Grid Skeleton */}
        <div className='w-full px-2 sm:px-0 grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='py-3 space-y-3'>
              {/* Card Image */}
              <div className='w-full aspect-4/5 bg-gray-200 rounded-lg'></div>
              {/* Card Title */}
              <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
              {/* Card Price */}
              <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategorySkeleton