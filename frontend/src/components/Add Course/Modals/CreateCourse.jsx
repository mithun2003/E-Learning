
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
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

import axios from '../../../axios'
import Swal from "sweetalert2";

const level = ["Easy", "Medium", "Hard"];
const CreateCourse = ({onOpen,onCloseModal}) => {
  const fileRef = useRef();

  const teacher = JSON.parse(localStorage.getItem("teacher"))
    const [course, setCourse] = useState({
        title: "",
        image: null,
        desc: "",
        cat: [],
        duration: "",
        level: "",
        teacher:teacher.id,
        is_publish: true
      });
      const token = localStorage.getItem('admin-access')
      const [open, setOpen] = useState(false);
      const [cat, setCat] = useState([]);
      const [selectedCat, setSelectedCat] = useState([]);
      const [formErrors, setFormErrors] = useState({
        title: false,
        image: false,
        desc: false,
        cat: false,
        duration: false,
        level: false,
      });
    const handleOpenModal=()=> {
        setOpen(true);
    }
    
    const handleCloseModal=()=>{
        // setOpen(false);
        setFormErrors({
            title: false,
            image: false,
            desc: false,
            cat: false,
            duration: false,
            level: false,
        });
        setCourse({
            title: "",
            image: null,
            desc: "",
            cat: [],
            duration: "",
            level: "",
            // is_publish: ""
        });
        setSelectedCat([])
        onCloseModal()
    }
    // const handleCategoryChange = (e) => {
    //     const { value } = e.target;
    //     console.log(e.target);
    //     const newCat = [...course.cat];
    //     const index = newCat.indexOf(value);
    //     if (index === -1) {
    //       newCat.push(value);
    //     } else {
    //       newCat.splice(index, 1);
    //     }
    //     setCourse((prevState) => ({
    //       ...prevState,
    //       cat: newCat,
    //     }));
    //   };
    const handleCategoryChange = (event) => {
      const {value} = event.target;
      console.log(event.target)
      console.log(event.target.value)
      setSelectedCat(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
      const catId = (typeof value === "string" ? value.split(",") : value).map((name) => {
        const category = cat.find((cat) => cat.name === name);
        return category ? category.id : null; // Return null if category is not found
      }).filter((id) => id !== null); 
      setCourse({ ...course, cat: catId });
      console.log(catId);
      if (formErrors.cat){
        setFormErrors((prevErrors)=>({
          ...prevErrors,
          cat:false
        }))
      }
    };
    
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
    };
      // const handleImageChange = (e) => {
      //   const file = e.target.files[0];
      //   console.log(file);
      //   if (file && file.type.startsWith("image/")) {
      //     setCourse({ ...course, image: file });
      //     setFormErrors((prevErrors) => ({
      //       ...prevErrors,
      //       image: false
      //     }));
      //   } else {
      //     setCourse({ ...course, image: null });
      //     setFormErrors((prevErrors) => ({
      //       ...prevErrors,
      //       image: true
      //     }));
      //   }
      //   console.log(course);
      // };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(course);

        const newFormErrors = {
          title: course.title === "",
          cat: course.cat.length === 0,
          desc: course.desc === "",
          level: course.level === "",
          duration: course.duration === "",
          image: course.image === null
        };
        setFormErrors(newFormErrors);
        const hasErrors = Object.values(newFormErrors).some((error) => error);
    
        if (!hasErrors) {
          FormSubmit();
        }
      };
    
      const FormSubmit = async () => {
        const file = fileRef.current.files[0];

        const formData = new FormData();
        formData.append('title', course.title);
        course.cat.forEach((cat)=>{
          formData.append('cat', cat);    
        })  
        formData.append('desc', course.desc);
        formData.append('level', course.level);
        formData.append('duration', course.duration);
        formData.append('teacher', course.teacher);
        if (fileRef.current.files.length > 0) {
          console.log("image appended");
          formData.append(
              "image",
            file,
            file?.name
            );
        }   
        formData.append('is_publish', "True");
      
        console.log(fileRef.current.files[0]?.name,fileRef.current.files[0]);
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }
        try {
          const response = await axios.post("course/course-create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          });
      
          setSelectedCat([]);
          handleCloseModal();
          return response.data;
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
      
    
      useEffect(() => {
        console.log("teacher",teacher);
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
              value={course.name}
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
            {formErrors.level? <p style={{ color: "red", marginBottom: "8px",marginTop:'-5px' }}>
                This field is require
              </p>:""}
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

            
          <FormControl fullWidth margin="normal">
  <InputLabel id="category-label">Category</InputLabel>
  <Select
    labelId="category-label"
    id="category"
    name="cat"
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
              accept="image/png, image/jpeg, image/jpg"
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
            {course.image?<img src={course.image}></img>:null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
          </form>
        </Dialog>
    </>
  )
}

export default CreateCourse
