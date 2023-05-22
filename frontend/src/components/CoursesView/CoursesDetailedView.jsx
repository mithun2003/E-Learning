import React, { lazy, useEffect, useState } from "react";
import { Box, Typography, Button, useMediaQuery, Grid, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { useTheme } from "@emotion/react";
import NameOfCourses from "./NameOfCourses";
import AboutCourse from "./AboutCourse";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { logout } from "../../Reducers/LoginReducer";
import CourseReviews from "./CourseReviews";




export default function CoursesDetailedView() {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem('user'))
  const isMobile = useMediaQuery(theme.breakpoints.down(1240));
  const { id } = useParams();
  const [wishlist, setWishlist] = useState();
  const [course, setCourse] = useState([]);
  const { isAuthenticated,token } = useSelector((state) => state.login);
  const [chapter, setChapter] = useState([]);
  const [enroll,setEnroll] = useState(false)
  const dispatch = useDispatch();
const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`/course/${id}/chapter-list`)
      .then((response) => {
        setChapter(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`/course/course-detail/${id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => console.log(error));
    console.log(course);
  }, []);
  useEffect(() => {
    fetchWishlist()
    console.log(chapter);
  }, []);

  useEffect(() => {
    axios
      .get(`/course/enrollment/${id}`)
      .then((response) => {
        if (response.data.enrolled === true)
        setEnroll(true);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [course]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`/course/wishlist/${id}`);
      console.log(response.data);
      setWishlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnroll = async () => {
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

    if (isAuthenticated) {
      try {
        await axios.post(`/course/enroll/${course.id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        await Swal.fire({
          position: "top-right",
          icon: "success",
          title: "You have enrolled in this course",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
        });
  
        const response = await axios.get(`/course/enrollment/${id}`);
        if (response.data.enrolled === true) {
          setEnroll(true);
        }
      } catch (error) {
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
        });
      }
    } else {
      Swal.fire({
        title: "",
        position: "top-right",
        text: "You have to login for enrolling.",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
      });
    }
  };
  const handleUnenroll = async () => {
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

    if (isAuthenticated) {
      try {
        await axios.post(`/course/unenroll/${course.id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        await Swal.fire({
          position: "top-right",
          icon: "success",
          title: "You unenrolled this course",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
        });
  
        const response = await axios.get(`/course/enrollment/${id}`);
        if (response.data.enrolled === false) {
          setEnroll(false);
        }
      } catch (error) {
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
        });
      }
    } else {
      Swal.fire({
        title: "",
        position: "top-right",
        text: "You have to login for enrolling.",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
      });
    }
  };
  
  const handleAddToWishlist = async () => {
    try {
      await axios.post('/course/wishlist/', { course_id: course.id });
      console.log('Course added to wishlist');
      fetchWishlist()
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveFromWishlist = async (courseId) => {
    try {
      await axios.delete(`/course/wishlist/remove/${id}`);
      console.log('Course removed from wishlist');
      setWishlist(null)
    } catch (error) {
      console.error(error);
    }
  };
  // const isCourseInWishlist = () => {
  //   if (!wishlist || !wishlist.courses) {
  //     return false;
  //   }
  //   return wishlist.courses.some((course) => course.id === id);
  //   wishlist && wishlist.some((course) => course.id === id && course.user === user.id)
  // };

  const categories = course.cat && course.cat.map((cat) => cat.name).join(", ");

  return (
    <div style={{ backgroundColor: "#C1D3DF" }}>
      <Box
        className="body"
        sx={{ backgroundColor: "#C1D3DF", marginTop: "16px" }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          direction={isMobile ? "column-reverse" : "row"}
          mb="5vh"
        >
          <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: "4vw" }}>
            <Box sx={{ m: { xs: 2, sm: 4, md: 6 }, paddingLeft: "4vw" }}>
              <Typography
                variant="h1"
                className="text-7xl text-gray-700"
                style={{
                  marginTop: isMobile ? 0 : 235,

                  fontWeight: 100,
                  color: "#1D5564"
                }}
              >
                {course.title}
              </Typography>
              <Typography
                sx={{
                  marginTop: isMobile ? 0 : 5,

                  color: "#1D5564",
                  fontSize: "18px",
                  lineHeight: "33px",
                  // top: "294px",
                  fontWeight: 300,
                  fontFamily:
                    "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif",
                  // position: "absolute",
                  display:'flex',
                  flexDirection: "row",
                  alignItems:'center'
                  // width: "500px"
                }}
              >
                {course.desc}
 </Typography>
              <Typography
                sx={{
                  marginTop: isMobile ? 0 : 5,
                  color: "#1D5564",
                  fontSize: "18px",
                  lineHeight: "33px",
                  // top: "294px",
                  fontWeight: 300,
                  fontFamily:
                    "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif",
                  // position: "absolute",
                  display:'flex',
                  flexDirection: "row",
                  alignItems:'center'
                  // width: "500px"
                }}
              >
                <Typography fontWeight={'bold'}>Rating &nbsp;:&nbsp; </Typography>{course.avg_rating}
                <Typography fontWeight={'bold'} marginLeft={2}>Course By &nbsp;:&nbsp; </Typography><Typography onClick={()=>navigate(`/teacher-profile/${user.name}`)} sx={{textDecoration:'underline',cursor:'pointer'}}>{course.teacher?.user.name}</Typography>
              </Typography>
              <Box     display='flex'
    alignItems='center'
    alignContent= 'center'
    flexDirection= 'row'
    flexWrap='wrap'>


{course?.teacher?.user.id !== user.id && (
  enroll ? (
    <Button
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        opacity: 0.8,
        backgroundColor: "rgba(25, 89, 100, 0.7)",
        marginTop: 5,
        "&:hover": { bgcolor: "#1D5564", opacity: "0.9" }
      }}
      onClick={handleUnenroll}
    >
      <Typography
        variant="h4"
        className="text-white"
        sx={{ color: "white", fontWeight: 100 }}
      >
        Unenroll
      </Typography>
    </Button>
  ) : (
    <Button
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 50,
        backgroundColor: "#1D5564",
        marginTop: 5,
        "&:hover": { bgcolor: "#1D5564", opacity: "0.9" }
      }}
      onClick={handleEnroll}
    >
      <Typography
        variant="h4"
        className="text-white"
        sx={{ color: "white", fontWeight: 100 }}
      >
        Enroll Now
      </Typography>
    </Button>
  )
)}




              {wishlist ?(<IconButton sx={{marginTop:'40px'}} onClick={handleRemoveFromWishlist}>
              <FavoriteOutlinedIcon sx={{width:'4rem', height:'3rem'}}/>
              </IconButton>):
              (<IconButton sx={{marginTop:'40px'}} onClick={handleAddToWishlist}>
              <FavoriteBorderIcon sx={{width:'4rem', height:'3rem'}}/>
              </IconButton>)}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ m: { xs: 2, sm: 4, md: 6 }, textAlign: "center" }}>
              <img
                className="shadow"
                style={{
                  // width: { xs: "100%", sm: "70%" },
                  width: isMobile ? "fit-content" : "70%",
                  height: "auto",
                  maxWidth: "100%",
                  boxShadow: 'rgb(0, 0, 0,1.3) 15px 10px 10px',
                  // marginLeft:'10px'
                  borderRadius:'8%',
                  [theme.breakpoints.up("sm")]: {
                    width: "100%"
                  }
                }}
                loading={lazy}
                src={course.image}
                alt="placeholder"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* <CourseList id={id}/> */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        direction={isMobile ? "column" : "row"}
        bgcolor="white"
        display={isMobile && 'flex'}
        sx={{alignItems:isMobile && 'flex-start'}}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: "4vw" }}>
          <NameOfCourses chapter={chapter} courseName={course.title} course_id={course.id}/>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: "4vw" }}>
          <AboutCourse course={course} categories={categories} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        alignItems="center"
        // direction={isMobile ? "column" : "row"}
        bgcolor="white"
      >
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ paddingLeft: "4vw" }}>
          <CourseReviews courseId={course.id} enroll={enroll}/>
          </Grid>
          </Grid>
    </div>
  );
}
