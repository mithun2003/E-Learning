import { useEffect, useRef, useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "../../axios";

export default function EditProfile({ onOpen, onCloseModal, userDetails }) {
    const fileRef = useRef();
    const [user, setUser] = useState(userDetails);
    const token = localStorage.getItem('access')
    // useEffect(() => {
    //     axios
    //     .get(`/view/user/${user?.id}`)
    //     .then((response) => {
    //       setUser(response.data);
    //       console.log(response.data);
    //       // localStorage.setItem("user",response.data)
    //     })
    //     .catch((error) => console.error(error));
    // }, []);
    
    const handleImageChange = (e) => {
            const file = URL.createObjectURL(e.target.files[0]);
            const name = e.target.files[0];
            console.log(file);
            console.log(file);
            if (file && name.type.startsWith("image/")) {
              setUser({...user,image:file})
            }
            console.log(user);
          };


    const handleInputChange = (event) => {
            console.log("catuu", user);
            const { name, value } = event.target;
            setUser((prevData) => ({
              ...prevData,
              [name]: value
            }));
          };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      console.log(user);
      const file = fileRef.current.files[0];
      const formData = new FormData();
      formData.append("name", user.name);
      if (fileRef.current.files.length > 0) {
        console.log("image appended");
        formData.append(
          "image",
          file,
          file?.name
        );
      }
      const response = await axios.put(`/user/edit/${user?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      onCloseModal();
      if (response.data.message) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong.',
        icon: 'error',
        backdrop: false // Disable backdrop overlay
      })
    }  
  };

  return (
      <Dialog open={onOpen} onClose={onCloseModal}>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogContent>
        <Avatar
            src={user?.image}
            sx={{
          m: "auto",
          bgcolor: "#1D5564",
          width: 64,
          height: 64,
          fontSize: 32,
          marginBottom: "2rem",
        }}
      />
          {/* Content of the modal */}
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={user?.name}
            onChange={handleInputChange}
          />
           <label
              style={{
                fontFamily: "Public Sans,sans-serif",
                color: "rgba(33,43,54,0.7)",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "5vh",
              }}
            >
              Upload Profile Image:
            </label>
            <br />

            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              sx={{ marginBottom: "16px", marginTop: "1rem" }}
              ref={fileRef}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
        </form>
      </Dialog>

  );
}
