import React,{useState,useRef, useEffect} from "react";
import svg from "./Images/6333040.jpg";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../actions/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { error,isAuthenticated} = useSelector((state)=> state.login);
  console.log(error);
  const inputRef=  useRef(null)
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png");
  const [user,setUser] = useState({
    username:'',
    email:'',
    password:'',
   });

   const {username,email,password} = user
   console.log(user);
   const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("avatar", avatar);
    myForm.set("username",username);
    myForm.set("password",password);
    myForm.set("email",email);
    dispatch(register(myForm));
    if(isAuthenticated===true){
      toast.success('successfull register')
    setTimeout(()=>{
      navigate('/profile')
    },3000)
     }
  };
  const user1 = localStorage.getItem('user')
  console.log(user1);
   useEffect(()=>{
     if(error){
      toast.error(error)
     }
     toast.info('Profile pic selection is mandatory and size of pic is less than 450KB ...'); 
     props.setPr(45);
     const time = setTimeout(()=>{
      props.setPr(100);
     },300)
     return ()=>{clearTimeout(time)}
   },[error,navigate])
   
   const changeImage =()=>{
    inputRef.current.click()
   }
const registerDataChange = (e) => {
  if (e.target.name === "avatar") {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  } else {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
};

  return (
      <>
        <div className="flex h-[100vh] w-[100vw] max-[948px]:flex max-[948px]:flex-col max-[948px]:justify-center max-[948px]:items-center">
          <div className="right h-[96%] w-[50%] max-[948px]:hidden">
            <img
              src={svg}
              alt=""
              className="mt-[10px]"
              style={{ height: "inherit" }}
            />
          </div>
          <div className="left w-[50%] flex justify-center items-center max-[948px]:h-[97%] max-[948px]:w-[92%] ">
            <div className="h-[98%] w-[70%] border shadow-lg rounded-2xl flex flex-col [@media(max-width:1100px)]:w-[89%]  ">
               <h1 className="min-[950px]:text-[49px] w-[100%] text-center font-semibold h-[100px] min-[950px]:pt-[10px]  [@media(max-width:948px)]:text-[5vw]">
                Sign Up
              </h1>
              <div id="registerImage"  className="max-[948px]:flex max-[948px]:justify-center" >
                  <img src={avatarPreview} alt="Avatar Preview"  onClick={changeImage} className='max-[948px]:h-[201px] max-[948px]:w-[201px] relative min-[950px]:mt-[10px] min-[950px]:left-[192px] h-[98px] min-[1100px]:left-[200px] rounded-full w-[100px]' />
                  <input
                    style={{display:"none"}}
                    ref={inputRef}
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
             <ToastContainer />
              <div className="flex justify-center items-center  h-[90%] min-[950px]:mt-[12px] ">
                <form action=""   encType="multipart/form-data"
                    onSubmit={registerSubmit}>
                  <div>
                    <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">Username</h1>
                    <input
                      type="text"
                      placeholder="Enter your name ..."
                      name="username"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                      onChange={registerDataChange}
                      value={user.username}
                    />
                  </div>
                  <div className="max-[948px]:mt-[41px]">
                    <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">E-mail</h1>
                    <input
                      type="email"
                      placeholder="Enter the E-mail address ..."
                      name="email"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                      onChange={registerDataChange}
                      value={user.email}
                    />
                  </div>
                  <div className="max-[948px]:mt-[41px]">
                    <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">Password</h1>
                    <input
                      type="text"
                      placeholder="Enter the 6 + Character ..."
                      name="password"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                      onChange={registerDataChange}
                      value={user.password}
                    />
                  </div>
                  <div className="h-[30px]  w-[100%] text-center text-[23px] ">
                  </div>
                  <div className="w-[100%] justify-center flex max-[948px]:relative max-[948px]:top-[40px]">
                  <button type='submit'  className='min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]'
                  >Create Account</button>
                  </div>
                  <div className=" w-[100%] text-center h-[10%] pt-[20px]  min-[950px]:text-[18px] cursor-pointer text-red-500">
                <Link to={'/log'}>
                <div>
                 <span className="text-blue-500 hover:underline">Already have a Account ?</span>
                 </div></Link>
              </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SignUp


