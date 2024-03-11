import React from 'react'
import { Link } from "react-router-dom";

const RelatedCard = ({product}) => {

  return (
    <Link to={`/product/${product._id}`} >
    <div onClick={window.scrollTo(0,0)}  className="max-[600px]:h-[496px] max-[752px]:w-[95%] hover:scale-105 duration-[1000ms] border min-[600px]:h-[450px] min-[768px]:w-[316px] z-50  max-[767px]:w-[45%]">
      <img src={product.images[0].url} alt="" className="h-[326px] w-[350px]"/>
      <div className="flex flex-col gap-2 ml-[10px] ">
        <p className="pt-[20px]">{product.name}</p>
        <div className="flex justify-start gap-[14px] max-[600px]:flex-col">
        </div>
        <span className="text-red-600">₹ {product.price}</span>
      </div>
    </div>
  </Link>
  )
}

export default RelatedCard
