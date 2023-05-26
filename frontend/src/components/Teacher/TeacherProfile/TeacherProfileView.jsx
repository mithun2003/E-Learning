import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { baseUrl } from "../../../constants/baseUrl";
import Courses from "../../Courses/Courses";
import axios from "../../../axios";
import { useParams } from "react-router-dom";

const TeacherProfileView = () => {
  const {teacher_id} = useParams()
const [teacher,setTeacher] = useState()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1240));
  const [course,setCourse] = useState()
  useEffect(()=>{
    axios
      .get(`/course/teacher/course-list/${teacher_id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },[])
  useEffect(()=>{
    axios
      .get(`/teacher/get/${teacher_id}`)
      .then((response) => {
        setTeacher(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },[teacher_id])
  return (
    <>
    <Box className="body">
      <Grid
        container
        spacing={2}
        alignItems="center"
        direction={isMobile ? "column-reverse" : "row"}
        mb="10vh"
        mt='10vh'
      >
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: "4vw" }}>
          <Box sx={{ m: { xs: 2, sm: 4, md: 6 }, paddingLeft: "4vw" }}>
            <Typography
              variant="h1"
              className="text-7xl text-gray-700"
              style={{
                marginTop: isMobile ? 0 : 200,
                fontFamily: "Gilda Display, serif",
                fontWeight: 100,
                color: "#1D5564"
              }}
            >
              {teacher?.user?.name}
            </Typography>
            <Typography
              // variant="h1"
              className="text-7xl text-gray-700"
              style={{
                // marginTop: isMobile ? 0 : 300,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                color: "#1D5564",
                fontSize:'20px'
              }}
            >
              {teacher?.user?.email}
            </Typography>

            {/* <Button
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 50,
                backgroundColor: "#1D5564",
                marginTop: 5
              }}
            >
              <Typography
                variant="h4"
                className="text-white"
                sx={{ color: "white", fontWeight: 100 }}
              >
                Start Here
              </Typography>
            </Button> */}
            <Typography
            lineHeight={3.5}
              sx={{color: "#1D5564", fontWeight: 500,fontSize:'16px',fontFamily: "Montserrat, sans-serif", }}
            >
              Total Courses : {course?.length}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box sx={{ m: { xs: 2, sm: 4, md: 6 }, textAlign: "center" }} display='flex' justifyContent='center'>
            <img src={`${baseUrl}${teacher?.user?.image}`} alt={teacher?.user?.name} style={{borderRadius:'50%',width:'30vh',height:'30vh'}}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default TeacherProfileView;
