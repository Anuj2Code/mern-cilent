import React, { useEffect, useState } from 'react'
import {motion,useScroll, useSpring } from 'framer-motion'
import { useLayoutEffect, useRef } from "react"
import {Link} from 'react-router-dom'
import { Expo } from 'gsap';
import cir from '../Componets/Images/inkpx-curved-text (2).png'
import ph from '../Componets/Images/phot.png'
import gsap from "gsap"
import Product from './Product';
import { getAllProduct } from '../actions/Product';
import {useDispatch,useSelector} from 'react-redux'
import Clothes from './Clothes';
import video from './pexels-polina-tankilevitch-5585946 (1080p).mp4'
import Marquee from './Marquee';
import Deal from './Deal';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scroll = useSpring(scrollYProgress);
  const dispatch = useDispatch()
  const {loading ,error,products, productsCount } = useSelector((state)=> state.products)
  
  useEffect(()=>{
    dispatch(getAllProduct())
  },[dispatch])

    const comp = useRef(null);
    useLayoutEffect(()=>{    
        let ctx = gsap.context(()=>{
         const t1 = gsap.timeline();
         t1.to('.hi',{
           y:0,
           ease:Expo.easeInOut,
           duration:2,
           stagger:0.8
         })
        },comp)
        return () => ctx.revert()     
       },[])

  return (
<>
<motion.div
    style={{
      scaleX:scroll,
      transformOrigin:'left',
      background:'blue',
      position:'fixed',
      top:0,
      width:'100%',
      height:'10px',
      zIndex:'999'
     }}
   />
<div className='hero min-h-[100vh] flex [@media(max-width:812px)]:flex-col ' ref={comp}>
    <div className="heroleft text-left w-[50vw] flex justify-center items-center flex-col  [@media(min-width:768px)]:h-[100vh] h-[60vh] [@media(max-width:812px)]:w-[100vw]">
   <div className='flex'>
    <motion.h1
    className='h-[10px]'
    initial={{width:0}}
    animate={{width:[0,100,0]}}
    transition={{
      ease:'linear',
      duration:2
    }}>
    </motion.h1>
   <motion.h1 className='uppercase [@media(min-width:501px)]:text-3xl text-xl mr-20 font-semibold pb-4 [@media(max-width:801px)]:pl-[60px] '
    >new arrivals only </motion.h1>
   </div>
    <div className="1r flex flex-col  overflow-hidden [@media(max-width:801px)]:gap-2 ">
    <h1 className=' hi text-2xl [@media(min-width:500px)]:text-6xl font-bold  [@media(min-width:501px)]:h-[73px] translate-y-[-80rem] '>New </h1>
    <h1 className=' hi text-2xl [@media(min-width:500px)]:text-6xl font-bold  [@media(min-width:501px)]:h-[73px] translate-y-[-80rem]'>collections</h1>
    <h1 className=' hi text-2xl [@media(min-width:500px)]:text-6xl font-bold  [@media(min-width:501px)]:h-[73px] translate-y-[-80rem]'>for everyone</h1>
    </div>
   <Link to='/new'>
   <button type="button" className="w-[152px] relative [@media(min-width:501px)]:right-[108px] btn btn-secondary  bg-black text-white top-6 [@media(max-width:501px)]:mr-10 ">New Arrival</button>
   </Link>
    </div>
    <div className="heroright w-[50vw] [@media(max-width:812px)]:w-[100vw] [@media(min-width:812px)]:h-[100vh] h-[92vh] ">
    <img src={ph}  className='h-[90vh] [@media(max-width:501px)]:h-[80vh]  [@media(max-width:800px)]:w-fit  ' style={{width:'100%'}}/>
    </div>
</div>
<Marquee name={'Feautred Product'}/>
<div className=' w-[100%] flex justify-end z-[999] fixed top-[610px] '>
       <motion.div className=''
        animate={{rotate:360}}
        transition={{
          duration:3,
          ease:'linear',
          repeat:Infinity
        }}
       > <img src={cir} alt="" className=' w-[115px] '/></motion.div>
    </div>l
<div className='mt-[50px] min-h-[140vh] flex flex-wrap justify-center gap-y-4  '>
  {products && products.map((product)=>{
    return <Product product={product}/>
  })}
</div>
  <video src={video} loop muted autoPlay controls = '' className='tar' > </video>
  <div className='text-center [@media(min-width:768px)]:text-[45px] [@media(max-width:739px)]text-[35px] pb-[20px] '
  >
  <Marquee name={'More Products'}/>
  </div>
  <Clothes/>
  <Deal/>
 <div>
 </div>
  <motion.div className='slide-in fixed max-[550px]:text-6xl top-[0px] left-[0px] w-[100%] h-[100vh] z-[50] bg-[#0f0f0f] flex justify-center items-center text-9xl text-white' style={{transformOrigin:'bottom'}}
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
           duration:1,
           ease:[0.22,1,0.36,1]
       }}
       >
        Loading ...
        </motion.div>
       <motion.div
       className='slide-out fixed z-[50] top-[0px] left-[0px] w-[100%] h-[100vh] bg-[#0f0f0f] ' style={{transformOrigin:'top'}}
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
  )
}

export default Home
