import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import img from '../Componets/img.png'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import img5 from './Images/down_10023987.png'
import 'react-toastify/dist/ReactToastify.css'; 
import img1 from './Images/OIP.jpg'
import img2 from './Images/shield.png'
import { sideData } from './SideData';
import {motion,AnimatePresence} from 'framer-motion'
import cross from './Images/cross.png'
import Navbar2 from './Navbar2';
const Navbar = () => {
  const [keyword,setKeyword] = useState('')
  const [po,setOp] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'));
  let admin=''
  if(!user){
    admin = null ;
  }else{
     admin = user.data.role;
  }
  console.log(admin);
  let image=''
  if(!user){
    image = null ;
  }else{
     image = user.data.avatar.url
  }
  const navigate = useNavigate();
  const [slide,setSlide] = useState(false);
  const searchSubmit = (e)=>{
    e.preventDefault();
    if(keyword.trim()){
       navigate(`/products/${keyword}`);
    }
    else{
      navigate('/products')
    }
  }
  const logout=()=>{
    localStorage.clear()
    toast.success("Logout successfull !")
    navigate('/')
  }
  return (
    <>
    <div className='navabar w-[100vw] h-[80px]  flex justify-around shadow-md text-black'>
    <div className='flex md:relative '>
    <AnimatePresence mode='wait'>
     {slide && <motion.div className='filterbox left-0 bg-white top-0 h-[100vh] overflow-auto z-50 w-[25vw] flex fixed  items-center justify-start flex-col max-[750px]:w-[100%]'
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
    >
       <div className='w-[100%] flex justify-end p-[10px]'><img src={cross} alt="" className='h-[84px] max-[505px]:h-[42px]' onClick={()=> setSlide(!slide)}/></div>
       <div className='h-[400px] w-[100%]'>
       {sideData.map((item,idx)=>{
     return(
      <>
           <li key={idx} className={item.cName} style={{listStyle:'none'}} >
          <Link to={item.path}>
          <div className='flex justify-center gap-[68px] pb-[20px]  max-[505px]:text-[20px]  text-[38px] font-semibold '>
            <motion.span className=' w-[200px] text-center rounded-lg'
              whileHover={{
                scale:1.1
              }}
              whileTap={{
                rotate:'3.5deg'
              }}
            >{item.title}</motion.span>
          </div>
          </Link>
        </li>
      </>
     )
  })}
       </div>
    </motion.div>}
    </AnimatePresence>
            <img src={img} alt="" onClick={()=> setSlide(!slide)} className='h-[51px] w-[42px] pt-[8px] mt-[14px] ml-[8px] cursor-pointer'/>
            <img src={img5} alt="" onClick={()=> setOp(!po)} className='h-[51px] w-[42px] pt-[8px] mt-[14px] ml-[8px] cursor-pointer min-[852px]:hidden' />
            <h1 className='relative max-[363px]:mt-[30px] min-[364px]:mt-[22px] left-[20px] min-[364px]:text-[2rem] font-bold max-[363px]:text-[23px]'>SHOPPER</h1>
           </div>
           <div className='max-[852px]:hidden'>
          <form action="" onSubmit={searchSubmit}>
          <input type="text" placeholder='Search Here ...' className=' ml-[10px] md:h-[46px] md:mt-[19px] text-center border-3 rounded-2xl max-[785px]:h-[40px] w-[24vw] max-[785px]:mt-[22px]' onChange={(e)=> setKeyword(e.target.value)} />
          </form>
           </div>
             <div className="bar2  relative top-5 max-[1088px]:hidden text-semibold">
            <ul className='flex gap-4 text-[1.5rem]'>
                <Link to="/">Home</Link>
                <Link to="/products">Product</Link>
                <Link to="/contact"  className='max-[1179px]:hidden'>Mail</Link>
                <Link to="/about" className='max-[1179px]:hidden'>About</Link>
            </ul>
           </div>
          
           <Link to={`/login`}>
        {user==null? <div>
            <button className='text w-[180px] h-[45px] mt-[18px] rounded-2xl bg-black text-white max-[667px]:hidden'>Register</button>
           </div>: <button className='text w-[180px] h-[45px] mt-[16px] rounded-2xl  bg-black  text-white max-[667px]:hidden' onClick={logout}>Logout</button>}
         </Link>
           {(user!=null && image) ? <Link to={'/profile'}>
            <img src={image} alt="" style={{height:'55px',borderRadius:'200%',objectFit:'cover',width:'57px',marginTop:'14px'}} /></Link> :<img src='./png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png' alt="" style={{height:'55px',borderRadius:'100%',width:'57px',marginTop:'14px'}} />}
         <Link to={'/cart'}>
         <img src={img1} alt="" style={{height:'55px',borderRadius:'100%',width:'57px',marginTop:'14px'}} className='max-[363px]:hidden' />
         </Link>
         <Link to={'/admin/dashboard'}>
         {admin==='admin'? <img src={img2} alt="" style={{height:'55px',borderRadius:'100%',width:'57px',marginTop:'14px'}} />:''}</Link>
    </div>
    <Navbar2 set={po} searchSubmit={searchSubmit} logout={logout} user={user} setKeyword={setKeyword}/>
    </>
  )
}

export default Navbar
