import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import jwt_decode from "jwt-decode";


// const loadUser = createAsyncThunk(
//     "login/loadUser",
//     async ()
// )

export const adminLoginUser = createAsyncThunk(
  "adminLogin/adminLoginUser",
  async (credentials,{rejectWithValue}) => {
    try {
      const response = await axios.post("/auth/users/admin/login/", credentials);
      const data = await response.data;
      console.log(response);
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("admin-access", data.access);
        localStorage.setItem("admin-refresh", data.refresh);
        const userData = data.user;
        localStorage.setItem("admin", JSON.stringify(userData));
        const user = response.data.user 
        console.log(user);
        return jwt_decode(data.access);
      } else {
        throw new Error("Wrong credentials");
      }
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const admin_token = localStorage.getItem("admin-access")
const initialState = {
    loading: false,
    success: admin_token?true:false,
    error: {},
    isStaff: admin_token?true:false ,
    admin: JSON.parse(localStorage.getItem("admin")) || {},
    token: localStorage.getItem("admin-access") || null
  };
  
const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    logout:(state)=>{
        state.success = false;
        state.isStaff = false;
        state.admin = {};
        state.token=null
        localStorage.removeItem("admin-access");
        localStorage.removeItem("admin")
        localStorage.removeItem("admin-refresh")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isStaff = true;
        state.admin = JSON.parse(localStorage.getItem("admin"));
        state.token = localStorage.getItem("admin-access");
        console.log(action.payload);
        console.log(action);
      })

      .addCase(adminLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
        state.token = null;
        console.log(action.payload);
        console.log(action.error);
      });
  }
});
export const {logout} = adminLoginSlice.actions
export default adminLoginSlice.reducer;
