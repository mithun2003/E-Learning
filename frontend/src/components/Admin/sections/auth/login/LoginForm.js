import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';// components
import Iconify from "../../../../../Admin/iconify";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginUser } from "../../../../../Reducers/AdminLogin";
import './Login.css'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email:'',
    password:''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const {success,loading,error} = useSelector((state)=>state.adminLogin)
  const [localerror,setLocalError]=useState('')
  const [formError,setFormError]=useState({
    email:false,
    password:false
  })
  useEffect(() => {
    setLocalError(error);
    if(error.message==="Cannot read properties of undefined (reading 'data')"){
      setLocalError({message:"Not Found"})
    }
    console.log(error.message);
  }, [error]);
  const handleSubmit = async e => {
    e.preventDefault();
    const newFormError={
      email:user.email==="",
      password:user.password===""
    }
    setFormError(newFormError)
    const hasError = Object.values(newFormError).some((error)=>error)
    if (!hasError){
      dispatch(adminLoginUser(user))
      setFormError({
        email:'',
        password:''
      })
    }

      
  };


  const handleChange = (event) => {
    setLocalError("");
    const {name}=event.target
    setUser({ ...user, [event.target.name]: event.target.value });
    setFormError((prevError) => ({
      ...prevError,
      [name]: false,
    }));
  };


 
  useEffect(() => {
    if (success) {
      navigate("/admin");
    }
  }, [success]);
  return (
    <div>
      {localerror && <p style={{ color: "red",marginBottom:"5vh" }}>{localerror.message?localerror.message:localerror.error}</p>}
      {/* {error && <p style={{ color: "red",marginBottom:"5vh" }}>{error.error}</p>} */}
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={handleChange}
          error={formError.email}
          helperText={formError.email && "Please enter your email"}
          />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          error={formError.password}
          helperText={formError.password && "Please enter your password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        >
          {loading ?  <div className="spinner"/> : 'Login'} 
        {/* {loading ? 'Loading...' : "Login"} */}
      </LoadingButton>
    </div>
  );
}
