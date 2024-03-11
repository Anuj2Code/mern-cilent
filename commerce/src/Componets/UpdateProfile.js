import React,{useState,useRef, useEffect} from "react";
import svg from "./Images/6333040.jpg";
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {updateProfile} from '../actions/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {UPDATE_PROFILE_RESET}  from "../constant/User";

const UpdateProfile = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user1 = JSON.parse(localStorage.getItem('user'));
  const id = user1.data._id;
  const im = user1.data.avatar.url;
  const imge = im.split('/');
  const last = imge[imge.length-1];
  const imgId = last.split('.')[0];
  console.log(id);
  const { error,isUpdated,loading} = useSelector((state)=> state.edit);
  const inputRef=  useRef(null)
  const [image, setimage] = useState('');
  const [imagePreview, setimagePreview] = useState("./png-clipart-user-profile-computer-icons-login-user-images-monochrome-black.png");
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');

   const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("image", image);
    myForm.set("username",username);
    myForm.set("email",email)
    dispatch(updateProfile(myForm,id,imgId));
  };

   useEffect(()=>{
     if(error){
      toast.error(error)
     }
     if (user1) {
      setUserName(user1.data.username);
      setEmail(user1.data.email);
      setimagePreview(user1.data.avatar.url);
    }
     if(isUpdated){
      toast.success('Profile is Updated');
      setTimeout(()=>{
        navigate('/profile')
      },3000)
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
     }
     props.setPr(45);
     const time = setTimeout(()=>{
      props.setPr(100);
     },300)
     return ()=>{clearTimeout(time)}

   },[error,navigate,dispatch,isUpdated])
   
   const changeImage =()=>{
    inputRef.current.click()
   }
const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setimagePreview(reader.result);
        setimage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
          <div className="left w-[50%] flex justify-center items-center max-[948px]:h-[97%] max-[948px]:w-[92%]">
            <div className=" h-[98%] w-[70%] border shadow-lg rounded-2xl flex flex-col [@media(max-width:1100px)]:w-[89%] ">
               <h1 className="min-[950px]:text-[49px] w-[100%] text-center font-semibold h-[100px] min-[950px]:pt-[20px]  [@media(max-width:948px)]:text-[5vw]
                 max-[950px]:pt-[35px] uppercase font-mono
               ">
                Update Profile
              </h1>
              <div id="registerImage" className="max-[948px]:flex max-[948px]:justify-center max-[950px]:mt-[25px]" >
                  <img src={imagePreview} alt="Avatar Preview"  onClick={changeImage} className='max-[948px]:h-[201px] max-[948px]:w-[201px] relative min-[950px]:mt-[10px] min-[950px]:left-[192px] h-[98px] min-[1100px]:left-[200px] rounded-full w-[100px]' />
                  <input
                    style={{display:"none"}}
                    ref={inputRef}
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
             <ToastContainer />
              <div className="flex justify-center items-center  h-[90%] min-[950px]:mt-[12px] ">
                <form action=""   encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}>
                  <div>
                    <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">Username</h1>
                    <input
                      type="text"
                      placeholder="Enter your name ..."
                      name="username"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                      onChange={(e)=> setUserName(e.target.value)}
                      value={username}
                    />
                  </div>
                  <div className="max-[948px]:mt-[41px]">
                    <h1 className="text-[25px] mb-[15px] max-[948px]:text-center">E-mail</h1>
                    <input
                      type="email"
                      placeholder="Enter the E-mail address ..."
                      name="email"
                      className="h-[35px] min-[950px]:w-[300px] rounded-2xl border-1 border-black text-center min-[950px]:mb-[20px] max-[948px]:w-[57vw]"
                      onChange={(e)=>setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="w-[100%] justify-center flex max-[948px]:relative max-[948px]:top-[40px]">
                  <button type='submit'  className='min-[950px]:h-[50px] min-[950px]:w-[300px] bg-black text-white rounded-3xl min-[950px]:mt-[25px] max-[948px]:w-[33vw] max-[948px]:h-[39px]'
                  >Update It </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default UpdateProfile
