import React from 'react'

const BannerSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-100 animate-pulse">
      {/* Fake Carousel Slide */}
      <div className="w-full h-125 flex items-center justify-around px-6">

        {/* LEFT CONTENT */}
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-300 rounded" />

          <div className="space-y-2">
            <div className="h-8 w-72 bg-gray-300 rounded" />
            <div className="h-8 w-64 bg-gray-300 rounded" />
          </div>

          <div className="h-4 w-40 bg-gray-300 rounded mt-2" />

          <div className="h-12 w-36 bg-gray-400 rounded-xl mt-6" />
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-130 h-95 bg-gray-300 rounded-xl" />
      </div>
    </div>
  )
}

export default BannerSkeleton