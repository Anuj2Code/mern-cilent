import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { productDetailsReducer, productReducer,newReviewReducer,relatedPro,reviewDelete,newProductReducer,productsReducer} from "./reducers/Product";
import {loginReducer,updateReducer,forgotPasswordReducer,allUsersReducer,userDetailsReducer,profileReducer}  from './reducers/User'
import {addToCartReducer} from './reducers/Cart'
import {createOrder,MyOrder,orderDetailsReducer,allOrdersReducer,orderReducer,emailReducer} from './reducers/Order' 

const reducer = combineReducers({
  products:productReducer,
  productDetails:productDetailsReducer,
  login:loginReducer,
  edit:updateReducer,
  forgotPass:forgotPasswordReducer,
  cart:addToCartReducer,
  newOrder:createOrder,
  myOrder:MyOrder,
  detail:orderDetailsReducer,
  review:newReviewReducer,
  related:relatedPro,
  revDel:reviewDelete,
  newPro:newProductReducer,
  editPro:productsReducer,
  allOrder:allOrdersReducer,
  getallUser:allUsersReducer,
  editOrder:orderReducer,
  adminUser:userDetailsReducer,
  adminpro:profileReducer,
  email:emailReducer
})

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
}

const middleware= [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware))
)
export default store
