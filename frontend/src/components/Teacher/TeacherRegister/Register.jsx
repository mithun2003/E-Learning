import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Card,
  CardContent,
  Box,
  Avatar,
  Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "../../../axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../Reducers/LoginReducer";
import Swal from "sweetalert2";
import { logout } from "../../../Reducers/LoginReducer";
import { baseUrl } from "../../../constants/baseUrl";

const countries = [
  "USA",
  "Canada",
  "Germany",
  "France",
  "Japan",
  "China",
  "India"
];
const intital_error = {
  name: false,
  country: false,
  mobile_number: false,
  highest_qualification: false,
  skills: false,
  address: false,
  image: false,
  resume: false,
  error: []
}
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(null);
  const [image, setImage] = useState(null);
  const  user = JSON.parse(localStorage.getItem("user"));
  const fileRef = useRef();
  console.log(user);
  useEffect(() => {
    document.body.style.backgroundColor = "#C1D3DF";
  }, []);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    country: user.country,
    mobile_number: user.mobile_number,
    highest_qualification: "",
    skills: "",
    address: "",
    image: user.image,
    resume: null,
    is_submit: false
  });
  const [formErrors, setFormErrors] = useState(intital_error);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
      error: []
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const newFormErrors = {
      name: formData.name === "",
      country: formData.country === "",
      mobile_number: formData.mobile_number === "",
      highest_qualification: formData.highest_qualification === "",
      skills: formData.skills === "",
      address: formData.address === "",
      image: formData.image === null,
      resume: formData.resume === null
    };
    setFormErrors(newFormErrors);
    const hasErrors = Object.values(newFormErrors).some((error) => error);

    if (user.is_blocked === true) {
      Swal.fire({
        title: "Error!",
        text: "You are blocked",
        icon: "error",
        backdrop: false
      }).then(() => {
        dispatch(logout())
      });
    }
    
    if (!hasErrors) {
      FormSubmit();
    }
  };

  const FormSubmit = async () => {
    console.log(formData);
    console.log(formData);
    console.log(fileRef.current.files);
    // const file = fileRef.current.files[0];
    const _form = new FormData();
    _form.append("name", formData.name);
    _form.append("email", formData.email);
    _form.append("country", formData.country);
    _form.append("mobile_number", formData.mobile_number);
    _form.append("highest_qualification", formData.highest_qualification);
    _form.append("skills", formData.skills);
    _form.append("address", formData.address);
    
    if (fileRef.current.files.length > 0) {
      console.log("image appended");
      _form.append(
        "image",
        fileRef.current.files[0],
        fileRef.current.files[0]?.name
      );
    }else if (user.image){
      _form.append("image",user.image)
    }
    _form.append("resume", formData.resume);
    setFormData({ ...formData, is_submit: true });
    _form.append("is_submit", formData.is_submit);
    try {
      const response = await axios.post("/teacher/register", _form, {
        onUploadProgress: (data) => {
          setLoad(Math.round((data.loaded / data.total) * 100));
        },
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const data = response.data;
      console.log(data);
      // Check if user is blocked
      if (data.is_blocked) {
        // Redirect to blocked page or show blocked message
        console.log("USER IS BLOCKED");
      } else {
        // User is not blocked, proceed with success action
        navigate("/profile");
        localStorage.setItem('user',JSON.stringify(response.data))
        setFormErrors(intital_error);
        // Update user state to mark form submission as complete
        const updatedUser = { ...user, is_submit: true };
        dispatch(setUser(updatedUser));

        return response.data;
      }
    } catch (error) {
      // Handle API error
        const updatedUser = { ...user, is_submit: false };
        dispatch(setUser(updatedUser));
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        error: error.response.data
      }));
      console.log(formErrors.error);
    }
  };

  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage(file)
    const name = e.target.files[0];
    console.log(file);
    console.log(file);
    if (file && name.type.startsWith("image/")) {
      // if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData,
        image: file
      })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        image: false
      }));
    } else {
      // setFormData({ ...formData, image: null });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        image: true
      }));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, resume: file });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        resume: false
      }));
    } else {
      setFormData({ ...formData, resume: null });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        resume: true
      }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card
          sx={{
            minWidth: 320,
            width: "100%",
            boxShadow: "13px 8px 7px rgba(0, 0, 0, 0.25)"
          }}
        >
          <CardContent>
            <Avatar
              sx={{
                m: "auto",
                bgcolor: "#1D5564",
                width: 64,
                height: 64,
                fontSize: 32,
                marginBottom: "1rem"
              }}
              src={image?image:`${baseUrl}${formData.image}`}
            >
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                // required
                sx={{ marginBottom: "16px" }}
                error={formErrors.name}
                helperText={formErrors.name ? "Please enter your name." : ""}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                disabled
                value={formData.email}
                fullWidth
                sx={{ marginBottom: "16px" }}
              />
              <FormControl
                fullWidth
                sx={{ marginBottom: "16px" }}
                error={formErrors.country}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={formErrors.country}
                  label="Country"
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formErrors.country && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "8px",
                    marginTop: "-5px"
                  }}
                >
                  This field is require
                </p>
              )}
              <TextField
                label="Phone Number"
                name="mobile_number"
                type="tel"
                value={formData.mobile_number}
                onChange={handleInputChange}
                fullWidth
                // required
                sx={{ marginBottom: "16px" }}
                error={formErrors.mobile_number}
                helperText={
                  formErrors.mobile_number
                    ? "Please enter your Phone Number."
                    : ""
                }
              />
              <TextField
                label="Qualification"
                name="highest_qualification"
                value={formData.highest_qualification}
                onChange={handleInputChange}
                fullWidth
                // required
                sx={{ marginBottom: "16px" }}
                error={formErrors.highest_qualification}
                helperText={
                  formErrors.highest_qualification
                    ? "Please enter your highest_qualification."
                    : ""
                }
              />
              <TextField
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                fullWidth
                // required
                error={formErrors.skills}
                helperText={
                  formErrors.skills ? "Please enter your skills." : ""
                }
                sx={{
                  marginBottom: "16px"
                }}
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: "16px" }}
                error={formErrors.address}
                helperText={
                  formErrors.address ? "Please enter your address." : ""
                }
              />
              <label
                style={{
                  fontFamily: "Public Sans,sans-serif",
                  color: "rgba(33,43,54,0.7)",
                  fontSize: "16px",
                  fontWeight: 550,
                  lineHeight: "23px"
                }}
              >
                Upload Image:
              </label>
              <br />

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                sx={{ marginBottom: "16px", marginTop: "1rem" }}
                error={formErrors.image}
                ref={fileRef}
              />
           
              {formErrors.image && (
                <p style={{ color: "red", marginBottom: "8px" }}>
                  This field is require
                </p>
              )}
              <br />
              <label
                style={{
                  fontFamily: "Public Sans,sans-serif",
                  color: "rgba(33,43,54,0.7)",
                  fontSize: "16px",
                  fontWeight: 550,
                  lineHeight: "23px"
                }}
              >
              Upload Resume:
              </label>
              <br />
              <TextField
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                sx={{ marginBottom: "16px", marginTop: "1rem" }}
                helperText="Please upload a PDF file"
                error={formErrors.resume}
              />
              {formData.resume && (
                <p style={{ marginBottom: "16px" }}>
                  Selected Resume: {formData.resume.name}
                </p>
              )}
              {formErrors.resume && (
                <p style={{ color: "red", marginBottom: "8px" }}>
                  This field is require
                </p>
              )}
              {load && (
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress variant="determinate" value={load} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {`${load}%`}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  marginTop: "16px",
                  backgroundColor: "#1D5564",
                  "&:hover": {
                    backgroundColor: "rgba(29, 85, 100, 0.9)" // Reduce the opacity to 60%
                  }
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color='error'
                onClick={()=>navigate('/profile')}
                sx={{marginTop:'1rem'}}
              >
                Cancel
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
