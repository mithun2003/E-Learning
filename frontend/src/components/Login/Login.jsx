import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import image from "../Signup/v5_1144.png";
import { useEffect } from "react";
import { loginUser } from "../../Reducers/LoginReducer";
import { useNavigate } from "react-router-dom";


const initialError={
  email:false,
  password:false
}
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [formError,setFormError]=useState(initialError)
  const [localerror, setLocalError] = useState("");
  const { loading, success, error } = useSelector((state) => state.login);
  useEffect(() => {
    setLocalError(error);
    console.log(error);
  }, [error]);
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('')
    const newFormError={
      email:user.email==="",
      password:user.password===""
    }
    setFormError(newFormError)
    const hasError = Object.values(newFormError).some((error)=>error)
    if (!hasError){
      dispatch(loginUser(user))
      setFormError({
        email:'',
        password:''
      })

    }
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#1D5564";
    document.body.style.height = "0"; 
    setLocalError('')

  }, []);
  const handleChange = (event) => {
    setLocalError("");
    const {name}=event.target
    setUser({ ...user, [event.target.name]: event.target.value });
    setFormError((prevError) => ({
      ...prevError,
      [name]: false,
    }));
  };
  return (
    <div className="body">
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 30
          }}
        >
          <Grid container sx={{ height: "25vh" }}>
            {/* <CssBaseline /> */}
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: "#c1d3df",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />

            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <p style={{ color: "red" }}>
                  {error ? error.detail : null}
                  {error?error.message:null}
                </p>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    value={user.email}
                    onChange={handleChange}
                    name="email"
                    error={formError.email}
          helperText={formError.email && "Please enter your email"}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    error={formError.password}
          helperText={formError.password && "Please enter your password"}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2 ,
                      bgcolor:'#1d5564',
                      "&:hover":{bgcolor:'rgba(29,85,100,0.9)'}
                  }}
                    
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      {/* <Link to="#" variant="body2" style={{color:"#1976d2"}}>
                        Forgot password?
                      </Link> */}
                    </Grid>
                    <Grid item>
                      <Link to="/signup" variant="body2" style={{color:"#1d5564"}}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
