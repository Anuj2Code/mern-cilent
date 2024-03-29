import {
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    OREDR_EMAIL_FAIL,
    OREDR_EMAIL_REQUEST,
    OREDR_EMAIL_SUCCESS,
  } from "../constant/Order";
  import axios from 'axios';

  export const CreateOr = (order,id)=> async(dispatch)=>{
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
     const {data} = await axios.post(`https://mern-api-ujke.onrender.com/api/order/createOrder?id=${id}`,order,config)
     dispatch({ type: CREATE_ORDER_SUCCESS, payload: data  });
  }

 export const myOrder = (id)=> async(dispatch)=>{
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const { data } = await axios.get(`https://mern-api-ujke.onrender.com/api/order/myOrder?id=${id}`);
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
 }

 export const getOrderDetails = (id) => async(dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`https://mern-api-ujke.onrender.com/api/order/singleOrder/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    // localStorage.setItem('det',JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get("https://mern-api-ujke.onrender.com/api/order/getAllOrder");

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`https://mern-api-ujke.onrender.com/api/order/updateOrder/${id}`,order,config);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(`https://mern-api-ujke.onrender.com/api/order/deleteOrder/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
 
export const orderEmail = (email)=> async(dispatch)=>{
  try {
    dispatch({ type: OREDR_EMAIL_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`https://mern-api-ujke.onrender.com/api/order/sucess?email=${email}`, config);
    dispatch({ type: OREDR_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({type: OREDR_EMAIL_FAIL,payload: error.response.data.message,});
  }
}