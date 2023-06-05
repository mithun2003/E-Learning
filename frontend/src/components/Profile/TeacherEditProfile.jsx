import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "../../axios";
import { baseUrl } from "../../constants/baseUrl";

export default function TeacherEditProfile({
  onOpen,
  onCloseModal,
  userDetails
}) {
  const fileRef = useRef();
  const [details, setDetails] = useState(userDetails);
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`/teacher/get/${user.id}`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file))
    console.log(file);
    if (image && file && file.type.startsWith("image/")) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        user: {
          ...prevDetails.user,
          image: file
        }
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.name, value);
    if (name.startsWith("user.")) {
      // Extract the field name after 'user.'
      const userField = name.split(".")[1];
      setDetails((prevDetails) => ({
        ...prevDetails,
        user: {
          ...prevDetails.user,
          [userField]: value
        }
      }));
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(details);
    try {
      console.log(details);
      const file = fileRef.current.files[0];
      const formData = new FormData();
      formData.append("name", details.user.name);
      formData.append("mobile_number", details.user.mobile_number);
      formData.append("highest_qualification", details.highest_qualification);
      formData.append("skills", details.skills);
      formData.append("address", details.address);
      if (fileRef.current.files.length > 0) {
        console.log("image appended");
        formData.append("image", file, file?.name);
      }
      const response = await axios.put(
        `/user/edit/${details.user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      onCloseModal();
      if (response.data.message) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        backdrop: false // Disable backdrop overlay
      });
    }
  };

  return (
    <Dialog open={onOpen} onClose={onCloseModal}>
      <DialogTitle>Edit Profile</DialogTitle>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogContent>
          <Avatar
            // src={image?image: `${baseUrl}${details.user.image}`}
            src={image?image:`${baseUrl}${details?.user?.image}`}
            sx={{
              m: "auto",
              bgcolor: "#1D5564",
              width: 64,
              height: 64,
              fontSize: 32,
              marginBottom: "2rem"
            }}
          />
          {/* Content of the modal */}
          <TextField
            label="Name"
            name="user.name"
            fullWidth
            value={details?.user?.name}
            onChange={handleInputChange}
          />
          <label
            style={{
              fontFamily: "Public Sans,sans-serif",
              color: "rgba(33,43,54,0.7)",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "5vh"
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
          <TextField
            label="Phone Number"
            name="user.mobile_number"
            fullWidth
            value={details?.user?.mobile_number}
            onChange={handleInputChange}
            sx={{ marginBottom: "16px", marginTop: "1rem" }}
          />
          <TextField
            label="Qualification"
            name="highest_qualification"
            value={details?.highest_qualification}
            onChange={handleInputChange}
            fullWidth
            // required
            sx={{ marginBottom: "16px" }}
       
          />
          <TextField
            label="Skills"
            name="skills"
            value={details?.skills}
            onChange={handleInputChange}
            fullWidth
      
            sx={{
              marginBottom: "16px"
            }}
          />
          <TextField
            label="Address"
            name="address"
            value={details?.address}
            onChange={handleInputChange}
            fullWidth
            row={4}
            sx={{ marginBottom: "16px" }}
           
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
