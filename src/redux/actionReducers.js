
import axios from "axios";
// Product action types
export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

// User action types
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

// Fetch products action
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// User login action
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const { data } = await axios.post("/api/login", credentials);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_PRODUCTS_SUCCESS:
        return { ...state, loading: false, products: action.payload };
      case GET_PRODUCTS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  


const initialState1 = {
    userInfo: null,
    loading: false,
    error: null,
  };
  
  export const userReducer = (state = initialState1, action) => {
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_USER_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case LOGIN_USER_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  