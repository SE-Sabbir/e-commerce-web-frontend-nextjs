"use client"
import React from 'react'
import { Rate } from 'antd';
import { FaRegHeart } from "react-icons/fa6";
import { Carousel } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const SingleCart = ({id ,slug ,pTitle , pImages=[] , pThumbnail ,pDisPrice , pPrice}) => {

  return (
    <>
    <Link href={`/products/${slug}`}>
      <div className="w-61 h-102 rounded-2xl border border-[#CCCCCC] shadow-md cursor-pointer hover:shadow-xl transition">
        <div className="m-5 flex flex-col items-center">
          <h2 className="font-poppins font-semibold text-sm text-deepdark text-center mb-3">
            {pTitle}
          </h2>

          <Rate size="small" disabled defaultValue={4} />

          <div className="w-full h-56">
            <Carousel autoplaySpeed={4000} autoplay>
              {/* Thumbnail */}
              {pThumbnail && (
                <div className="relative w-full h-52">
                  <Image
                    src={pThumbnail}
                    alt={pTitle}
                    fill
                    sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw,25vw"
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Sub Images */}
              {pImages?.length > 0 &&
                pImages.map(
                  (img, index) =>
                    img && (
                      <div
                        key={index}
                        className="relative w-full h-52"
                      >
                        <Image
                          src={img}
                          alt={pTitle}
                          fill
                          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw,25vw"
                          className="object-contain"
                        />
                      </div>
                    )
                )}
            </Carousel>
          </div>

          <h3 className="w-full flex items-center gap-2 font-poppins font-semibold text-xl text-[#EB4227]">
            ${pDisPrice}
            <span className="text-sm text-[#666666] line-through">
              ${pPrice}
            </span>
          </h3>

          <div className="w-full flex items-end justify-between">
            <p className="pt-4 font-poppins text-sm text-[#666666]">
              <span className="font-semibold text-deepdark">1286</span>{" "}
              Purchases
            </p>
            <FaRegHeart />
          </div>
        </div>
      </div>
    </Link>
    </>
  )
}

export default SingleCart