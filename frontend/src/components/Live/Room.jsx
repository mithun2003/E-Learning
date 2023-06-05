import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "../../axios";

const Room = ({ isOpen, isClose }) => {
  const [roomName, setRoomName] = useState("");
  const [image, setImage] = useState(null);
  const fileRef = useRef();
  const [errors, setErrors] = useState({
    name: false,
    image: false
  });

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit random number
    return randomNumber.toString(); // Convert the random number to a string
  };

  const openNewWindow = (url) => {
    window.open(url, "_blank", "width=1000,height=500"); // Open the URL in a new window
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {
      name: roomName === "",
      image: image === null
    };
    setErrors(newError);

    const hasErrors = Object.values(newError).some((error) => error);
    if (!hasErrors) {
      FormSubmit();
    }
  };

  const FormSubmit = async () => {
    const file = fileRef.current.files[0];

    const formData = new FormData();
    formData.append("name", roomName);
    formData.append("room_code", generateRandomNumber());
    if (fileRef.current.files.length > 0) {
      formData.append("thumbnail", file, file?.name);
    }

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post("/live/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      const randomPath = "/live/" + formData.get("room_code");
      if (response) {
        sessionStorage.setItem("is_host", "true");
        setImage("");
        setRoomName("");
        openNewWindow(randomPath);
        isClose();
      }

      // return response.data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        backdrop: false
      });
    }
  };

  const handleClose = () => {
    setImage("");
    setRoomName("");
    isClose();
  };

  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);

    if (file && e.target.files[0].type.startsWith("image/")) {
      setImage(file);
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: false
      }));
    } else {
      setErrors({ ...errors, image: true });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={isClose}>
        <DialogTitle>Create Live</DialogTitle>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogContent>
            <TextField
              label="Live Name"
              variant="outlined"
              fullWidth
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              error={errors.name} // Add error prop to TextField
              helperText={errors.name && "This field is required"} // Add helperText prop to display error message
            />
            <label
              style={{
                fontFamily: "Public Sans, sans-serif",
                color: "rgba(33, 43, 54, 0.7)",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "23px"
              }}
            >
              Upload Thumbnail:
            </label>
            <br />
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              ref={fileRef}
            />
            {errors.image && (
              <p style={{ color: "red", marginBottom: "8px" }}>
                This field is required
              </p>
            )}
            {image && <img src={image} alt="Thumbnail" />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Room;
