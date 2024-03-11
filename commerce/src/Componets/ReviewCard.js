import React, { useState } from 'react'

const ReviewCard = ({data}) => {
  
  return (
    <div className="bg-[#fffeff] reviewCard border-black shadow-xl border-solid  flex justify-center items-center flex-col rounded-2xl min-h-[300px] md:w-[500px] text-center  max-[750px]:w-[80%]"
    >
    <img src={data.img} alt="User" className='h-[79px] w-[83px] rounded-full border-2 border-black shadow relative bottom-[40px]'/>
    <div className='mb-[31px]'>
    <p className='text-[38px]'>{data.name}</p>
    <span className="reviewCardComment font-sans text-wrap">{data.comm}</span>
    </div>
  </div>
  )
}

export default ReviewCard
