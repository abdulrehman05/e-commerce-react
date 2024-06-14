import axios from "axios";
import { combineReducers } from "redux";

// Action Types
export const GET_PRODUCTS_REQUEST = "GET_PRODUCTS_REQUEST";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

export const SIGNUP_USER_REQUEST = "SIGNUP_USER_REQUEST";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAIL = "SIGNUP_USER_FAIL";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAIL = "CREATE_PRODUCT_FAIL";

export const GET_CART_REQUEST = "GET_CART_REQUEST";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAIL = "GET_CART_FAIL";

export const ADD_TO_CART_REQUEST = "ADD_TO_CART_REQUEST";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL";

export const DECREASE_QUANTITY_REQUEST = "DECREASE_QUANTITY_REQUEST";
export const DECREASE_QUANTITY_SUCCESS = "DECREASE_QUANTITY_SUCCESS";
export const DECREASE_QUANTITY_FAIL = "DECREASE_QUANTITY_FAIL";

export const REMOVE_FROM_CART_REQUEST = "REMOVE_FROM_CART_REQUEST";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAIL = "REMOVE_FROM_CART_FAIL";

export const CHECKOUT_REQUEST = "CHECKOUT_REQUEST";
export const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
export const CHECKOUT_FAIL = "CHECKOUT_FAIL";
// Actions

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const headers = {
      Authorization: getState().user.userInfo.token,
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND + "/api/products/get-all",
      {
        headers: headers,
      }
    );
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND + "/api/auth/login",
      credentials
    );

    localStorage.setItem("userInfo", JSON.stringify(data?.data?.payload));
    await dispatch({ type: LOGIN_USER_SUCCESS, payload: data?.data?.payload });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw new Error(error.response.data.message);
  }
};

export const signupUser = (userDetails) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_USER_REQUEST });
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND + "/api/auth/signup",
      userDetails
    );
    dispatch({ type: SIGNUP_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SIGNUP_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const createProduct = (productDetails) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND + "/api/product/create",
      productDetails
    );
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_REQUEST });
    const headers = {
      Authorization: getState().user.userInfo.token,
    };
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND + "/api/cart/getCart",
      { headers }
    );
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const addToCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });
    const headers = {
      Authorization: getState().user.userInfo.token,
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/cart/${productId}/add`,
      {},
      { headers }
    );
    dispatch(getCart()); // Fetch the updated cart
    dispatch({ type: ADD_TO_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const decreaseQuantity = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DECREASE_QUANTITY_REQUEST });
    const headers = {
      Authorization: getState().user.userInfo.token,
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/cart/${productId}/decrease`,
      {},
      { headers }
    );
    dispatch(getCart()); // Fetch the updated cart
    dispatch({ type: DECREASE_QUANTITY_SUCCESS });
  } catch (error) {
    dispatch({
      type: DECREASE_QUANTITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_FROM_CART_REQUEST });
    const headers = {
      Authorization: getState().user.userInfo.token,
    };
    await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/cart/remove`,
      { productId },
      { headers }
    );
    dispatch(getCart()); // Fetch the updated cart
    dispatch({ type: REMOVE_FROM_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

export const checkout = (orderDetails) => async (dispatch) => {
  try {
    dispatch({ type: CHECKOUT_REQUEST });
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND + "/api/checkout",
      orderDetails
    );
    dispatch({ type: CHECKOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHECKOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    throw error;
  }
};

// Reducers

const initialProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = (state = initialProductState, action) => {
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

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialUserState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

export const userReducer = (state = initialUserState, action) => {
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

const initialSignupState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const signupReducer = (state = initialSignupState, action) => {
  switch (action.type) {
    case SIGNUP_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNUP_USER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case SIGNUP_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialCreateProductState = {
  product: null,
  loading: false,
  error: null,
};

export const createProductReducer = (
  state = initialCreateProductState,
  action
) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case CREATE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialCartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CART_SUCCESS:
      return { ...state, loading: false, cartItems: action.payload };
    case GET_CART_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialCheckoutState = {
  order: null,
  loading: false,
  error: null,
};

export const checkoutReducer = (state = initialCheckoutState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return { ...state, loading: true, error: null };
    case CHECKOUT_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case CHECKOUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
