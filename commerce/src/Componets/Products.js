import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getAllProduct } from "../actions/Product";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from '@mui/material/Typography';
import {motion,AnimatePresence} from 'framer-motion'
import cross from './Images/cross.png'
import filter from './Images/filter.jpg'

const Products = (props) => {
  const location = useLocation();
  const id1 = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 2500]);
  const [slide,setSlide] = useState(false)
  const [category,setCategory] = useState("")
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const { products, productsCount, perPage } = useSelector(
    (state) => state.products
  );

  console.log(products);
  useEffect(() => {
    dispatch(getAllProduct(id1,currentPage,price,category));
  }, [dispatch, id1,currentPage,price,category]);

  const categories = [
    'Books',
    'Clothes',
    'Snacks',
    'Technology',
    'shoe',
    'Toy'
  ]
  useEffect(()=>{
    props.setPr(45);
    const time = setTimeout(()=>{
     props.setPr(100);
    },300)
    return ()=>{clearTimeout(time)}
  },[])
  return (
    <>
     <AnimatePresence mode='wait'>
   {slide && <motion.div className="filterbox bg-white top-0 h-[100vh] overflow-auto z-50 w-[30vw] flex fixed  items-center justify-start flex-col max-[750px]:w-[100%]"
       initial={{
        x:-1000,
      }}
      animate={{
        x:0
      }}
      exit={{
        x:-1000
      }}
      transition={{
        type:'tween',
        duration:1
      }}
      > <div className="w-[100%] flex justify-end p-[10px]"> <img src={cross} alt="" className="h-[70px] max-[505px]:h-[42px]"  onClick={()=> setSlide(!slide)} /></div>
      <Typography style={{marginTop:'40px',fontSize:"30px",fontWeight:'bolder'}}>Price Range</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1}
              max={2500}
             style={{width:'70%'}}/>
      <Typography style={{marginTop:'25px',fontSize:"30px",fontWeight:'bolder'}} >Category</Typography> 
      <div className="box md:mt-[12px]  gap-[6px] " >
        {categories.map((category)=>{
          return <div className="flex justify-center gap-[68px] pb-[20px] max-[505px]:text-[20px] text-[18px] uppercase font-semibold">
            <motion.div key={category} onClick={()=> setCategory(category) } style={{cursor:'pointer'}} className="w-[150px] h-[35px] pt-[5px] text-center rounded-lg bg-black text-white "
          whileHover={{
            scale:1.1
          }}
          whileTap={{
            rotate:'3.5deg'
          }}
          >
            {category}
          </motion.div>
          </div>
        })}
        </div> 
      </motion.div>}
      </AnimatePresence>
      <div className=" w-[85px] h-[80px] mt-[8px] min-[751px]:ml-[10px] max-[750px]:ml-[4px] flex justify-center items-center rounded-full min-[751px]:bg-black cursor-pointer  " onClick={()=> setSlide(!slide)} >
        <img src={filter} alt="" className=" h-[68px] max-[505px]:h-[42px] rounded-full"/>
      </div>
      {products.length===0?<div className="h-[60vh] flex justify-center items-center">
        <div className="font-[static] text-[45px] font-bold" >
           Sorry No Products to Show
        </div>
      </div>:<div className=" min-h-[160vh] flex flex-wrap justify-center gap-y-4  ">
        {products &&
          products.map((product) => {
            return <Product product={product} />;
          })}
      </div>}
     {perPage < productsCount && products.length!==0 &&(
            <div className="paginationBox h-[20vh] w-[100%] flex justify-center max-[750px]:mt-[25px] ">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={perPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next "
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
              linkClassFirst="bg-black text-white"
              linkClassLast="bg-black text-white"
              linkClassNext="bg-black text-white"
              linkClassPrev="bg-black text-white"
           />
          </div>
     )}
       <motion.div className='slide-in fixed max-[550px]:text-6xl top-[0px] left-[0px] z-[50] w-[100%] h-[100vh] bg-[#0f0f0f] flex justify-center items-center text-9xl text-white' style={{transformOrigin:'bottom'}}
       initial={{
           scaleY:0
       }}
       animate={{
           scaleY:0
       }}
       exit={{
           scaleY:1
       }}
       transition={{
           duration:2,
           ease:[0.22,1,0.36,1]
       }}
       >
        Loading...
        </motion.div>
       <motion.div
       className='slide-out fixed top-[0px] left-[0px] w-[100%] z-[50] h-[100vh] bg-[#0f0f0f] ' style={{transformOrigin:'top'}}
       initial={{
           scaleY:1
       }}
       animate={{
           scaleY:0
       }}
       exit={{
           scaleY:0
       }}
       transition={{
           duration:1,
           ease:[0.22,1,0.36,1]
       }}
       />
    </>
  );
};

export default Products;
