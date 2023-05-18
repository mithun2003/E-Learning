import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  loading: false,
  success: false,
  error: {}
};

export const saveUserAsync = createAsyncThunk(
  "register/saveUserAsync",
  async (user, { rejectWithValue }) => {
    console.log(user);
    try {
      const response = await axios.post("/auth/users/", user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
      
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(saveUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  }
});


export default registerSlice.reducer