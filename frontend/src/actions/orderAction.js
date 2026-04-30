import API from "../api/axios";

import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  NEW_ORDER_FAIL,
  NEW_ORDER_REQUEST,
  NEW_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS
} from "../constants/orderConstants";



export const newOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await API.post("/order/new", order, config);

    dispatch({
      type: NEW_ORDER_SUCCESS,
      payload: data,
    });

    return { payload: data };

  } catch (error) {
    dispatch({
      type: NEW_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });

    throw error;
  }
};



export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await API.get("/orders/me");

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });

  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await API.get(`/order/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await API.get("/admin/orders");

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });

  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, 
    };

    const { data } = await API.put(`/admin/order/${id}`, order, config);

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });

  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await API.delete(`/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });

  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};