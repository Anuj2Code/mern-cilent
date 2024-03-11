import React, { useState ,useEffect} from "react";
import Product from "./Product";
import axios from 'axios';
import {motion} from 'framer-motion'

const Deal = () => {
    const cat = "Deal"
    const [data,setData] = useState([])
    useEffect(()=>{ 
        const fetchData =async()=>{
          try {
              let info = await axios.get(`http://localhost:8800/api/item/filter?category=${cat}`);
              setData(info.data);
          } catch (error) {
              console.log(error);
          }
        }
        fetchData()
         },[]);
  return (
    <>
      <div className='w-[100%]  max-[703px]:h-[219vh] max-[1003px]:h-[150vh] h-[90vh] '>
          <h1 className='w-[100%] relative text-center text-[55px] font-serif top-[10px]'>Deal Of The Day</h1>
          <motion.div className="h-[100px] mt-[10px] z-50 w-[310px] rounded-lg ml-2 pl-1  bg-black text-white absolute flex items-center font-bold" style={{fontFamily:'sans-serif'}}
            initial={{
                x:'-100%'
            }}
            animate={{
                x:0
            }}
            transition={{
                type:'tween',
                duration:4,
                repeatDelay:2,
                repeat:Infinity,
            }}
          >
    You can Save upto 50% Of Your saving
          </motion.div>
    <div className='mt-[50px] flex flex-wrap justify-center gap-y-4  '>
    {data &&
      data.map((product) => {
        return <Product product={product} />;
      })}
     </div>
      </div>
    </>
  )
}

export default Deal
