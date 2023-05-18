import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";

import axios from "../../../axios";
import { useParams } from "react-router-dom";

const initialError = {
  title: false,
  order: false,
  video: false,
  error: []
};
const ChapterAdd = ({ onOpen, onCloseModal, id,token}) => {
  const [load, setLoad] = useState(null);
  const fileRef = useRef()
  const [chapter, setChapter] = useState({
    title: "",
    course: id,
    video: null,
    order: ""
  });
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState(initialError);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    // setOpen(false);
    if (formErrors.error) {
      console.log(formErrors.error);
      return;
    } else {
      setFormErrors({
        title: false,
        order: false,
        video: false,
        error: []
      });
      setChapter({
        title: "",
        order: "",
        video: null,
        course: id
      });
      onCloseModal();
    }
  };
  const closeModal = () => {
    setFormErrors({
      title: false,
      order: false,
      video: false,
      error: []
    });
    setChapter({
      title: "",
      order: "",
      video: null,
      course: id
    });
    setLoad(null);
    onCloseModal();
  };
  const handleVideoChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0])

    const name = e.target.files[0]
    console.log(name);
    console.log(file);
    if (file && name.type.startsWith("video/")) {
      setChapter({ ...chapter, video: file });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        video: false
      }));
    } else {
      setChapter({ ...chapter, video: null });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        video: true
      }));
    }
    console.log(chapter);
  };

  const handleSubmit = (event) => {
    console.log(id);
    event.preventDefault();
    console.log(chapter);
    const newFormErrors = {
      title: chapter.title === "",
      order: chapter.order === "",
      video: chapter.video === null
    };
    setFormErrors(newFormErrors);
    const hasErrors = Object.values(newFormErrors).some((error) => error);

    if (!hasErrors) {
      FormSubmit();
    }
  };

  const FormSubmit = async () => {
    const formData = new FormData();
    formData.append("title", chapter.title);
    formData.append("course", chapter.course);
    formData.append("order", chapter.order);
    if (fileRef.current.files.length>0){
      formData.append("video",
      fileRef.current.files[0],
      fileRef.current.files[0]?.name,
      );
    }

    try {
      const response = await axios.post("course/chapter-add", formData, {
        onUploadProgress: (data) => {
          setLoad(Math.round((data.loaded / data.total) * 100));
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`

        }
      });

      setFormErrors(initialError);
      setLoad(null);
      closeModal();
      console.log(response.data);
      console.log(formData);

      return response.data;
    } catch (error) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        error: error
      }));
      console.log(formErrors.error);
    }
  };

  //Create New Courses
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChapter((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
      error: []
    }));
  };

  return (
    <>
      <Dialog open={onOpen} onClose={handleCloseModal}>
        <DialogTitle>Add Chapter</DialogTitle>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Chapter Name"
              fullWidth
              name="title"
              value={chapter.name}
              onChange={handleInputChange}
              error={formErrors.title}
              helperText={formErrors.title ? "Please enter a title" : ""}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Order Number"
              name="order"
              fullWidth
              value={chapter.order}
              onChange={handleInputChange}
              error={formErrors.order}
              helperText={formErrors.order ? "Please enter a order" : ""}
              sx={{ marginBottom: 2 }}
            />
            {formErrors.error && (
              <p style={{ color: "red", marginBottom: "8px" }}>
                {formErrors.error.order}
              </p>
            )}
            <label
              style={{
                fontFamily: "Public Sans,sans-serif",
                color: "rgba(33,43,54,0.7)",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "23px"
              }}
            >
              Upload Video:
            </label>
            <br />

            <input
              type="file"
              accept="video/*"
              // accept="video/mp4, video/mpeg, video/mkv"
              onChange={handleVideoChange}
              sx={{ marginBottom: "16px", marginTop: "1rem" }}
              error={formErrors.video}
              ref={fileRef}
            />

            {formErrors.video && (
              <p style={{ color: "red", marginBottom: "8px" }}>
                This field is required
              </p>
            )}
            <br />
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
            <br/>
            {chapter.video ? (
              <video
                src={chapter.video}
                style={{ width: "50vh" }}
                controls
              ></video>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChapterAdd;
