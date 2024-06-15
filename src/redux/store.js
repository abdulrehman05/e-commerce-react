import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  userReducer,
  productReducer,
  createProductReducer,
  cartReducer,
  checkoutReducer,
  signupReducer,
  myProductReducer,
} from "./actionReducers";
import orebiSlice from "./orebiSlice";

// actionTypes.js
export const LOGOUT = "LOGOUT";

// actionCreators.js
export const logout = () => {
  localStorage.removeItem("userInfo");
  return { type: LOGOUT };
};

const appReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  orebiReducer: orebiSlice,
  signup: signupReducer,
  createProduct: createProductReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  myProducts: myProductReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    // Map each key in the state to an empty object
    state = Object.keys(state).reduce((newState, key) => {
      newState[key] = {};
      return newState;
    }, {});
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
