import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link to={`/product/${product._id}`} >
      <div onClick={window.scrollTo(0,0)} className="max-[600px]:h-[496px] max-[752px]:w-[95%] hover:scale-105 duration-[1000ms] border shadow-lg min-[600px]:h-[471px] min-[768px]:w-[316px] z-50 md:ml-[20px] max-[767px]:w-[45%]   ">
        <img src={product.images[0] && product.images[0].url} alt="" className="h-[326px] w-[350px]"/>
        <div className="flex flex-col gap-2 ml-[10px] text-left ">
          <p className="pt-[20px]">{product.name}</p>
          <div className="flex justify-start gap-[14px] max-[600px]:flex-col">
            <ReactStars {...options} /> <span>${product.numOfReviews} review</span>
          </div>
          <span className="text-red-600">₹ {product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default Product;
