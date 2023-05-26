import { Grid, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { logout } from "../../Reducers/LoginReducer";
import axios from "../../axios";
import { useDispatch } from "react-redux";
const initialState = {
  name: "",
  email: "",
  message: ""
};
const initialError = {
  name: false,
  email: false,
  message: false
};
const Contact = () => {
  const [message, setMessage] = useState(initialState);
  const [error, setError] = useState(initialError);
  const [fails,setFails]=useState()
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: false
    }));
    if (name==='email'){
      setFails('')
    }
  };

  const handleSubmit = (e) => {
    const newError = {
      name: message.name === "",
      email: message.email === "",
      message: message.message === ""
    };
    setError(newError);
    const hasErrors = Object.values(newError).some((error) => error);

    if (!hasErrors) {
      FormSubmit();
    }
  };

  const FormSubmit = async () => {
    try {
      const response = await axios.post("contact/", message);
      setMessage(initialState)
      // const data = response?.data;
      // console.log(data);
      // // Check if user is blocked
      // if (data.is_blocked) {
      //   Swal.fire({
      //     title: "Error!",
      //     text: "You are blocked",
      //     icon: "error",
      //     backdrop: false
      //   }).then(() => {
      //     dispatch(logout());
      //   });
      //   console.log("USER IS BLOCKED");
      // } else {
      //   setMessage(initialState);
      //   setError(initialError);
      // }
    } catch (error) {
      console.log(error.response.data);
      setFails(error.response.data)
    }
  };

  return (
    <Grid
      container
      spacing={2}
      mb={5}
      mt={5}
      bgcolor="#C1D3DF"
      marginBottom="1"
    >
      <Grid item xs={12} md={6}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "300",
            lineHeight: 3,
            color: "#1D5564",
            marginLeft: "2rem",
            px: 8
          }}
        >
          Contact us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "lg",
            fontWeight: "thin",
            lineHeight: 1.2,
            color: "#1D5564",
            marginLeft: "2rem",
            px: 8,
            minWidth: "70px"
          }}
        >
          Users can provide their thoughts, opinions, suggestions, or comments
          regarding a course, teacher, or experience.{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          spacing={2}
          sx={{ width: "95%", margin: "auto", marginRight: "2rem" }}
        >
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="name"
              value={message.name}
              onChange={handleInputChange}
              fullWidth
              placeholder="Name"
              sx={{ bgcolor: "white" }}
              error = {error.name}
              helperText = {error.name && "Please enter your name"}
            />
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="email"
              onChange={handleInputChange}

              value={message.email}
              fullWidth
              placeholder="Email"
              sx={{ bgcolor: "white" }}
              error = {error.email}
              helperText = {error.email && "Please enter your email"}
            />
            {fails && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "8px",
                    marginTop: "-5px"
                  }}
                >
                  {fails.email}
                </p>
              )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              name="message"
              value={message.message}
              onChange={handleInputChange}

              multiline
              rows={4}
              fullWidth
              placeholder="Message"
              sx={{ bgcolor: "white" }}
              error = {error.message}
              helperText = {error.message && "Please enter a message"}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type='submit'
              sx={{ width: "fit-content", marginBottom: "10px",cursor:'pointer'}}
              onClick={handleSubmit}
              
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
