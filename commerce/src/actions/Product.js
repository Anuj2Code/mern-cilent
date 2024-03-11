import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    PRODUCT_RELATED_FAIL,
    PRODUCT_RELATED_SUCCESS,
    PRODUCT_RELATED_REQUEST,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
  } from "../constant/Pro";

export const getAllProduct = (keyword = "", currentPage = 1, price = [0, 2500], category)=> async(dispatch)=>{
  try {
    console.log(category);
    dispatch({ type:ALL_PRODUCT_REQUEST})
    let link = `https://mern-api-ujke.onrender.com/api/item/product/all/product-list?keyword=${keyword}&page=${currentPage}&min=${price[0]}&max=${price[1]}`
    if(category){
           link = `https://mern-api-ujke.onrender.com/api/item/product/all/product-list?keyword=${''}&page=${currentPage}&min=${''}&max=${''}&category=${category}`
    }
    const {data} = await axios.get(link);
    console.log(data,'hello ');
    dispatch({
        type:ALL_PRODUCT_SUCCESS,
        payload:data
    })
  }
   catch (error) {
    dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.response.data.message
    })
  }
}

// export const getAllDeal = ( currentPage = 3)=> async(dispatch)=>{
//   try {
//     dispatch({ type:ALL_PRODUCT_REQUEST})
//     let link = `https://mern-api-ujke.onrender.com/api/item/product/all/product-list?keyword=${''}&page=${currentPage}&min=${''}&max=${''}&category=${''}`
//     const {data} = await axios.get(link);
//     console.log(data,'hello ');
//     dispatch({
//         type:ALL_PRODUCT_SUCCESS,
//         payload:data
//     })
//   }
//    catch (error) {
//     dispatch({
//         type:ALL_PRODUCT_FAIL,
//         payload:error.response.data.message
//     })
//   }
// }
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("https://mern-api-ujke.onrender.com/api/item/getPo");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.prod,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (myForm,id) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `https://mern-api-ujke.onrender.com/api/item/product/new?id=${id}`, myForm, config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getProDetails = (id)=> async(dispatch)=>{
 try {
  dispatch({type:PRODUCT_DETAILS_REQUEST});

  const {data} = await axios.get(`https://mern-api-ujke.onrender.com/api/item/product/details/${id}`)
  
  dispatch({
    type:PRODUCT_DETAILS_SUCCESS,
    payload:data
  })
 } catch (error) {
  dispatch({
    type:PRODUCT_DETAILS_FAIL,
    payload:error.response.data.message
})
 }
}
  export const newReview = (myForm,id,username) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(`https://mern-api-ujke.onrender.com/api/item/createReview?id=${id}&username=${username}`, myForm, config);
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const filter = (cat)=> async(dispatch)=>{
  try {
    dispatch({type:PRODUCT_RELATED_REQUEST});
    const {data} = await axios.get(`https://mern-api-ujke.onrender.com/api/item/filter?category=${cat}`);
    dispatch({
      type:PRODUCT_RELATED_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:PRODUCT_RELATED_FAIL,
      payload: error.response.data.message,
    });
  }
}
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `https://mern-api-ujke.onrender.com/api/item/product/update/${id}`,
      productData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`https://mern-api-ujke.onrender.com/api/item/product/delete/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const reviewDel = (ProductID,id)=> async(dispatch)=>{
  try {
    dispatch({type:DELETE_REVIEW_REQUEST});
    const {data} = await axios.delete(`https://mern-api-ujke.onrender.com/api/item/deleteReivew?ProductID=${ProductID}&id=${id}`)
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
}