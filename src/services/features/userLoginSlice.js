import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("USER_LOGIN", async (info, thunkAPI) => {

   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      // console.log(info);
      const data = await axios.post("/signin", info, config);
      console.log(data);
      return "Bearer "+data.data.token;
   } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
         error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
      );
   }
});

export const logout = createAsyncThunk("USER_LOGOUT", async (thunkAPI) => {
   try {
      localStorage.removeItem("userInformation");
      return true;
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
});

export const userLoginSlice = createSlice({
   name: "user",
   initialState: {
      userInformation: localStorage.getItem("userInformation")
         ? JSON.parse(localStorage.getItem("userInformation"))
         : null,
      loading: false,
      error: null,
   },
   // reducers:
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.userInformation = action.payload;
            localStorage.setItem(
               "userInformation",
               JSON.stringify(action.payload)
            );
         })
         .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.userInformation = null;
         })
         .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            state.userInformation = null;
         })
         .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

// export const { login } = userLoginSlice.actions;

export default userLoginSlice.reducer;
