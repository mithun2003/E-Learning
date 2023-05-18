import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Signup.css";
import { saveUserAsync } from "../../Reducers/SignupReducer";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import image from "../Signup/v5_1144.png";
import { useEffect } from "react";
const Signup = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    re_password: ""
  });
  const [localerror,setLocalError] = useState('')
  const { loading, success,error } = useSelector((state) => state.register);
  useEffect(() => {
    setLocalError(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalError(error)
    // if (user.password===user.re_password){
        dispatch(saveUserAsync(user));
    // }
    
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#1D5564";
    document.body.style.height = "0"; 

  }, []);
  const handleChange = (event) => {
        setLocalError('')
    
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div className="body" >
      {success ? ( 
      <Container component="main" maxWidth="lg">
          <Box
            sx={{
              marginTop: 15
            }}
            >
            <Grid container sx={{ height: "10vh" }}>
            {/* <CssBaseline /> */}
            <Grid
              item
              xs={false}
              sm={5}
              md={10}
              sx={{
                
                backgroundRepeat: "no-repeat",
                backgroundColor: "#c1d3df",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              />
              
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                
              <span className="email">
                Please check your email and click the activation link to complete the
                sign-up process.
              </span>
          </Box>
          </Grid>
          </Box>
          </Container>
        ) : (
        <Container component="main" maxWidth="lg" >
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
                    Sign Up
                  </Typography>
                  <p style={{color:"red"}}>
                    {localerror ? localerror.non_field_errors:null}
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
                      id="name"
                      label="Name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      autoFocus
                      error={!!localerror?.name}
                      helperText={localerror?.name}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      value={user.email}
                      onChange={handleChange}
                      name="email"
                      error={!!localerror?.email}
                      helperText={localerror?.email}
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
                      error={!!localerror?.password}
                      helperText={localerror?.password}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="re_password"
                      label="Password"
                      type="password"
                      value={user.re_password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      error={!!localerror?.re_password}
                      helperText={localerror?.re_password}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {loading ? "Signing up..." : "Sign up"}
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        
                      </Grid>
                      <Grid item>
                        <Link to="/login" variant="body2" style={{color:"#1976d2"}}>
                          {"Already have account? Sign In"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
                    )}
      
    </div>
  );
};

export default Signup;
