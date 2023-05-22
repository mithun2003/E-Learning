import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
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
  TextField
} from "@mui/material";

import axios from "../../../axios";
import Swal from "sweetalert2";

const level = ["Easy", "Medium", "Hard"];
const EditCourse = ({ onOpen, onCloseModal, id }) => {
  const fileRef = useRef();
  const [course, setCourse] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState();  
  const [teacher, setTeacher] = useState([]);
  const [cat, setCat] = useState([]);
  const [arr,setArr]=useState([])
  const [formErrors, setFormErrors] = useState({
    title: false,
    image: false,
    desc: false,
    cat: false,
    duration: false,
    level: false,
    teacher: false
  });
  const token = localStorage.getItem('admin-access')

  useEffect(() => {
    axios
      .get(`/course/course-detail/${id}`)
      .then((response) => {
        setCourse((prevCourse) => ({
          ...prevCourse,
          ...response.data,
          teacher: response.data.teacher.id,
          cat: response.data.cat.map((c) => c.id),
        }));
        setSelectedCat(response.data.cat.map((category) => category.name));
        console.log("category", response.data);
        console.log(course);
        setCourse({...response.data,teacher: response.data.teacher.id,cat:[]})
        console.log(course);
      })
      .catch((error) => console.error(error));
  
    axios
      .get("/category")
      .then((response) => {
        setCat(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  

  const handleCloseModal = () => {
    // setOpen(false);
    setFormErrors({
      title: false,
      image: false,
      desc: false,
      cat: false,
      duration: false,
      level: false,
      teacher: false
    });

    onCloseModal();
  };
  // const handleCategoryChange = (e) => {
  //   const { value } = e.target;
  //   let newCat = [...arr];
  //   const index = newCat.indexOf(value);
  //   if (index === -1) {
  //     newCat.push(value);
  //   } else {
  //     newCat.splice(index, 1);
  //   }
    
  //   setArr(newCat);
  //   console.log(course);
  // };
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCat(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
     // Generate catId using the updated value of selectedCat
  // const catId = (typeof value === "string" ? value.split(",") : value).map((name) => {
  //   const category = cat.find((cat) => cat.name === name);
  //   return category.id;
  // });
  const catId = (typeof value === "string" ? value.split(",") : value).map((name) => {
    const category = cat.find((cat) => cat.name === name);
    return category ? category.id : null; // Return null if category is not found
  }).filter((id) => id !== null); 
  setCourse({ ...course, cat: catId });
  console.log(catId);
  };
  
  
//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     let newCat = [...course.cat];
//     const index = newCat.indexOf(value);
//     if (index === -1) {
//       newCat.push(value);
//     } else {
//       newCat.splice(index, 1);
//     }
    
//     setCourse((prevState) => ({
//       ...prevState,
//       cat: newCat
//     }));
//     console.log(course);
//   };
  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    const name = e.target.files[0];
    console.log(file);
    console.log(file);
    if (file && name.type.startsWith("image/")) {
      setCourse({...course,image:file})
      setFormErrors((prevErrors)=>({
        ...prevErrors,
        image:false
      }))
    }else{
      setFormErrors((prevErrors)=>({
        ...prevErrors,
        image:true
      }))
    }
    console.log(course);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(course);
    const newFormErrors = {
      title: course.title === "",
      // cat: course.cat.length === 0,
      desc: course.desc === "",
      level: course.level === "",
      duration: course.duration === "",
      teacher: course.teacher === "",
      image: course.image === null
    };
    setFormErrors(newFormErrors);
    const hasErrors = Object.values(newFormErrors).some((error) => error);

    if (!hasErrors) {
      FormSubmit();
    }
  };

  const FormSubmit = async () => {
    try {
      console.log(course);
      const file = fileRef.current.files[0];
      const formData = new FormData();
      formData.append("title", course.title);
      course.cat.forEach((cat)=>{
        formData.append('cat', cat);    
      })   
      formData.append("desc", course.desc);
      formData.append("level", course.level);
      formData.append("duration", course.duration);
      formData.append("teacher", course.teacher);
      if (fileRef.current.files.length > 0) {
        console.log("image appended");
        formData.append(
          "image",
          file,
          file?.name
        );
      }
      formData.append("is_publish", course.is_publish);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await axios.put(`/course/course-edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      handleCloseModal();
      // return response.data;
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

  useEffect(() => {
    axios
      .get("/teacher/get")
      .then((response) => {
        setTeacher(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    axios
      .get("/course/category-list")
      .then((response) => {
        setCat(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  //Create New Courses
  const handleInputChange = (event) => {
    console.log(arr)
    console.log("catuu", course.cat);
    console.log("catuuuuuuuu", course);
    const { name, value } = event.target;
    setCourse((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false
    }));
  };
  return (
    <>
      <Dialog open={onOpen} onClose={handleCloseModal}>
        <DialogTitle>Add Category</DialogTitle>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Course Name"
              fullWidth
              name="title"
              value={course.title}
              onChange={handleInputChange}
              error={formErrors.title}
              helperText={formErrors.title ? "Please enter a title" : ""}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              multiline
              name="desc"
              rows={3}
              fullWidth
              value={course.desc}
              onChange={handleInputChange}
              error={formErrors.desc}
              helperText={formErrors.desc ? "Please enter a description" : ""}
              sx={{ marginBottom: 2 }}
            />
            <FormControl
              fullWidth
              sx={{ marginBottom: "16px" }}
              error={formErrors.level}
              >
              <InputLabel>Level</InputLabel>
              <Select
                name="level"
                value={course.level}
                onChange={handleInputChange}
                error={formErrors.level}
              >
                {level.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formErrors.level ? (
              <p
                style={{ color: "red", marginBottom: "8px", marginTop: "-5px" }}
              >
                This field is require
              </p>
            ) : (
                ""
            )}
            <TextField
              autoFocus
              margin="dense"
              label="Duration"
              name="duration"
              multiline
              fullWidth
              value={course.duration}
              onChange={handleInputChange}
              error={formErrors.duration}
              helperText={
                formErrors.duration
                  ? "Please enter a duration"
                  : "Format hh:mm:ss"
              }
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel>Teacher</InputLabel>
              <Select
                name="teacher"
                value={course.teacher}
                onChange={handleInputChange}
                error={formErrors.teacher}
              >
                {teacher.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formErrors.teacher ? (
              <p
                style={{ color: "red", marginBottom: "8px", marginTop: "-5px" }}
              >
                This field is require
              </p>
            ) : (
              ""
            )}
              <FormControl required fullWidth margin="normal">
  <InputLabel id="category-label">Category</InputLabel>
  <Select
    labelId="category-label"
    label="Category"
    id="category"
    multiple
    value={selectedCat}
    onChange={handleCategoryChange}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {console.log(selected)}
        {selected.map((value) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    )}
  >
    {cat.map((category) => (
      <MenuItem key={category.id} value={category.name}>
        {category.name}
      </MenuItem>
    ))}
  </Select>
  {formErrors.cat && (
    <FormHelperText error>Select at least one category</FormHelperText>
  )}
</FormControl>
            <label
              style={{
                fontFamily: "Public Sans,sans-serif",
                color: "rgba(33,43,54,0.7)",
                fontSize: "16px",
                fontWeight: 500,
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
            {course.image ? <img src={course.image}/> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditCourse;
