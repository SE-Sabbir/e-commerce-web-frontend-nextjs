import React from 'react'

const CategorySkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto mt-15 text-center animate-pulse">

      {/* HEAD SKELETON */}
      {/* <div className="space-y-2 mb-12">
        <div className="h-7 w-72 mx-auto bg-gray-300 rounded" />
        <div className="h-4 w-48 mx-auto bg-gray-200 rounded" />
      </div> */}

      {/* CATEGORY CIRCLES */}
      <div className="my-12 flex items-center gap-6 justify-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <div className="w-27 h-27 rounded-full bg-gray-300" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      {/* BOTTOM BANNERS */}
      <div className="w-full flex items-center justify-between gap-6 mt-10">
        <div className="w-158 h-58 rounded-xl bg-gray-300" />
        <div className="w-158 h-58 rounded-xl bg-gray-300" />
      </div>

    </div>
  )
}

export default CategorySkeleton