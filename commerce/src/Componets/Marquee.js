import { motion } from 'framer-motion'
import React from 'react'

const Marquee = ({name}) => {
    return (
    <div data-sroll data-scroll-section data-scroll-speed="0.1" className='w-full h-[50vh] pt-5 '>
      <div className='border-t-2 border-b-2 bg-[#270b0f] border-zinc-300 overflow-hidden flex whitespace-nowrap '>
        <motion.h1 className=' text-white text-[15vw] leading-none font-mono font-semibold uppercase pt-8 pr-[75px]' 
        initial={{x:0}} 
        animate={{x:"-100%"}} 
        transition={{
         ease:"linear",
         repeat:Infinity,
        duration:8.5
        }}
         >{name}
         </motion.h1>
          <motion.h1 className=' text-white text-[15vw] leading-none font-mono font-semibold uppercase pt-8 pr-[75px]' 
        initial={{x:0}} 
        animate={{x:"-100%"}} 
        transition={{
         ease:"linear",
         repeat:Infinity,
        duration:8.5
        }}
         >{name}
         </motion.h1>
         <motion.h1 className=' text-white text-[15vw] leading-none font-mono font-semibold uppercase pt-8 pr-[75px]' 
        initial={{x:0}} 
        animate={{x:"-100%"}} 
        transition={{
         ease:"linear",
         repeat:Infinity,
        duration:8.5
        }}
         >{name}
         </motion.h1>
      </div>
    </div>
  )
}

export default Marquee
