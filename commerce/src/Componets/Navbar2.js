import React,{useState} from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

const Navbar2 = ({set,searchSubmit,setKeyword,user,logout}) => {
  return (
   <>
   {set &&  <motion.div className='h-[10vh]  '
      initial={{
        y:"-100%",
        opacity:0
      }}
      animate={{
        y:0,
        opacity:1
      }}
    >
     <div className='flex gap-2'>
     <form action="" onSubmit={searchSubmit}>
          <input type="text" placeholder='Search Here ...' className=' ml-[10px] md:h-[46px] md:mt-[19px] text-center border-3 rounded-2xl max-[785px]:h-[45px] w-[50vw] max-[785px]:mt-[16px]' onChange={(e)=> setKeyword(e.target.value)} />
          </form>
         <Link to={`/login`}>
        {user==null? <div>
            <button className='min-[597px]:hidden text w-[180px] h-[45px] mt-[18px] rounded-2xl bg-black text-white min-[667px]:hidden '>Register</button>
           </div>: <button className='text w-[180px] h-[45px] mt-[16px] rounded-2xl  bg-black  text-white min-[667px]:hidden' onClick={logout}>Logout</button>}
         </Link>
     </div>
    </motion.div>}
   </>
  )
}

export default Navbar2
