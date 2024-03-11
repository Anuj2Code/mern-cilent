import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProDetails,filter } from "../actions/Product";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from  '../Componets/ReviewCard'
import {addToCart} from '../actions/Cart'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {newReview,reviewDel} from '../actions/Product'
import {motion,AnimatePresence} from 'framer-motion'
import cross from '../Componets/Images/trash_8357206.png'
import profilePng from "../Componets/Images/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { DELETE_REVIEW_RESET, NEW_REVIEW_RESET } from "../constant/Pro";
import { Rating } from "@material-ui/lab";
import RelatedCard from "./RelatedCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemPiece = (props) => {
  const [quantity, setQuantity] = useState("1");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const location = useLocation();
  const id1 = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const {pro} = useSelector((state)=> state.related)
  console.log(pro);
  const { success } = useSelector(
    (state) => state.review
  );
  const incPrice= ()=>{
    if(product.Stock<=quantity) return ;
    const qnt1 = quantity+1;
    setQuantity(qnt1)
  }
  const decPrice= ()=>{
    if (1 >= quantity) return;
    let qnt = quantity-1;
    setQuantity(qnt)
  }

  useEffect(() => {
    dispatch(filter(product.category))
    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProDetails(id1));
    props.setPr(45);
   const time = setTimeout(()=>{
    props.setPr(100);
   },300)
   return ()=>{clearTimeout(time)}
  }, [dispatch,id1,success,product.category]);

  const addToCartHandler = () => {
    dispatch(addToCart(id1, quantity));
    toast.success('Item Added To Your Cart')
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  let id ='';
  let username=''
  const user = JSON.parse(localStorage.getItem('user'));
  if(user){
    id = user.data._id;
    username = user.data.username;
  }
  else{
    id=null;
    username=null;
  }
  console.log(id);

  const deleteReview = (id5)=>{
    if(id5===id){
      dispatch(reviewDel(id1,id5))
      dispatch({type:DELETE_REVIEW_RESET});
      toast.success('Review Deleted ')
    }
    else{
      toast.error("you can only delete your own review ")
    }
  }
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
   
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productID",id1);

    dispatch(newReview(myForm,id,username));

    setOpen(false);
  };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings ,
  };

  return (
    <>
     <ToastContainer />
      <div className="firstmodel h-[110vh] flex  [@media(max-width:780px)]:flex-col [@media(max-width:800px)]:justify-center [@media(max-width:800px)]:items-center [@media(max-width:800px)]:h-[156vh]">
        <div className="sec w-[50%] [@media(min-width:900px)]:mt-[15px] ">
          <Carousel className="relative [@media(min-width:768px)]:left-[70px] [@media(min-width:768px)]:top-[35px] [@media(max-width:350px)]:h-[46vh]">
            {product.images &&
              product.images.map((item, i) => {
                return (
                  <img src={item.url} key={item.url} className=" w-[35vw] h-[90vh] [@media(max-width:800px)]:w-[50vw] [@media(max-width:800px)]:h-[43vh]" />
                );
              })}
          </Carousel>
        </div>
        <div className="w-[45%] rounded-2xl [@media(max-width:400px)]:w-[90vw] flex flex-col justify-center h-[100vh] items-center gap-8  border shadow-lg [@media(min-width:900px)]:mt-[25px]  [@media(min-width:900px)]:w-[45vw] [@media(max-width:650px)]:w-[80vw]  [@media(max-width:800px)]:w-[80vw] [@media(min-width:900px)]:mr-[20px]" >
              <div className="detailsBlock-1">
                <h2 className="text-[45px] uppercase">{product.name}</h2>
              </div>
              <div className="detailsBlock-2 flex justify-center flex-col">
              {/* <div className="ml-[28px]"> <ReactStars {...options} /></div> */}
                <span className="detailsBlock-2-span text-[25px]">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3 gap-4 flex flex-col">
                <h1 className="text-[30px] text-red-600 text-center">{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1 flex flex-col gap-4">
                  <div className="detailsBlock-3-1-1 flex gap-3 justify-center">
                    <button className="text-[45px]" onClick={()=> decPrice()}>-</button>
                    <input type="number" readOnly='true' className="w-[65px] border-3 border-slate-500 text-center h-[30px] mt-[25px]" value={quantity} />
                    <button className="text-[30px] mt-[8px]" onClick={()=> incPrice()}>+</button>
                  </div>
                  <button className="w-[300px] h-[45px] bg-black text-white rounded-2xl [@media(max-width:400px)]:w-[200px]" onClick={addToCartHandler}  disabled={product.Stock < 1 ? true : false}> Add to Cart</button>
                </div>
               <div className="flex justify-center">
               <p className="flex gap-2 text-[20px] text-center">
                  <p className="text-[28px] [@media(max-width:400px)]:pl-[20px] font-bold text-center">Status : </p>
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
               </div>
              </div>
              <div className="detailsBlock-4 flex [@media(max-width:450px)]:flex-col ">
               <p className="text-[21px] [@media(max-width:400px)]:pl-[20px] font-bold "> Description  </p> <p className="text-[20px] font-semibold ml-[5px] max-[750px]:text-[14px] max-[750px]:mt-[5px]"> { product.description}</p>
              </div>
              <button onClick={submitReviewToggle}   className="submitReview w-[300px] h-[45px] bg-black text-white rounded-2xl [@media(max-width:400px)]:w-[200px]">
                Submit Review
              </button>
            </div>
          </div>
          <h1 className="uppercase text-[50px] font-bold w-[100%] text-center">Reviews</h1>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog flex flex-col">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        {product.reviews && product.reviews[0]?(
            <div className="reviews flex flex-wrap overflow-x-scroll justify-center gap-4 items-center min-h-[80vh]">
             { product.reviews && product.reviews.map((review)=>{
                return (
                  <div className="reviewCard border-black max-[750px]:w-[80%] border-solid flex justify-center items-center flex-col min-h-[300px] md:w-[580px]  text-center shadow-2xl " 
                  >  <div className="w-[100%] flex justify-end relative bottom-10 right-4"
                    ><img src={cross} alt="" onClick={()=> deleteReview(review.user)} className='h-[29px] w-[32x]' /> </div>
                      <div className='flex w-[100%] justify-end relative bottom-10 right-3' >
                      </div>
                  <img src={profilePng} alt="User" className='h-[79px] w-[83px] rounded-full'/>
                  <p>{review.name}</p>
                  <ReactStars {...options} />
                  <span className="reviewCardComment">{review.comment}</span>
                </div>
                )
             })}            
            </div>
          ):
          (
            <div className="min-h-[31vh] pt-6">
 <p className="text-[45px] text-center drop-shadow h-[180px] flex items-center justify-center">No Reviews Yet !</p>
            </div>
          )}
          <h1 className="uppercase text-[50px] font-bold w-[100%] text-center mb-[30px]">Related Products</h1>
         <div className="h-[67vh] w-[100%] flex gap-12 pt-[25px] ml-[25px] overflow-hidden flex-wrap justify-center gap-y-4 max-[751px]:h-[265vh] max-[1040px]:h-[133vh] ">
       {pro && pro.slice(0,4).map((product)=>{
         return (
          <RelatedCard product={product}/>
         )
       })}
         </div>
    </>
  );
};

export default ItemPiece;
