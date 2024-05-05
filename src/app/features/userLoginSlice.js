import { createSlice } from "@reduxjs/toolkit";

import {
   USER_LOGIN_REQUEST,
   USER_LOGIN_FAIL,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
} from "../constants/userConstants";

export const userLoginSlice = createSlice({
   name: "user",
   initialState: {
      user: localStorage.getItem("userInfo")
         ? JSON.parse(localStorage.getItem("userInfo"))
         : null,
   },
   reducers: {
      userLoginReducer: (state, action) => {
         switch (action.type) {
            case USER_LOGIN_REQUEST:
               return { loading: true };
            case USER_LOGIN_SUCCESS:
               return { loading: false, userInfo: action.payload };
            case USER_LOGIN_FAIL:
               return { loading: false, error: action.payload };
            case USER_LOGOUT:
               return {};
            default:
               return state;
         }
      },
   },
});

export const { userLoginReducer } = userLoginSlice.actions;

export default userLoginSlice.reducer;
