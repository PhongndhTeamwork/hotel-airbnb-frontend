import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("USER_LOGIN", async (info, thunkAPI) => {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };
      const data = "Phongngg";
      // const { data } = await axios.post("/api/user/login/", info, config);
      return data;
   } catch (error) {
      return thunkAPI.rejectWithValue(
         error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
      );
   }
});

export const userLoginSlice = createSlice({
   name: "user",
   initialState: {
      userInfo: localStorage.getItem("userInfo")
         ? JSON.parse(localStorage.getItem("userInfo"))
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
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
         })
         .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});

// export const { login } = userLoginSlice.actions;

export default userLoginSlice.reducer;
