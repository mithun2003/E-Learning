import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  Grid,
  IconButton,
  CircularProgress
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { useTheme } from "@emotion/react";
import NameOfCourses from "./NameOfCourses";
import AboutCourse from "./AboutCourse";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { logout } from "../../Reducers/LoginReducer";
import CourseReviews from "./CourseReviews";
import Chat from "./Chat";
import { fetchCourse, setNull } from "../../Reducers/CourseReducer";

export default function CoursesDetailedView() {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const isMobile = useMediaQuery(theme.breakpoints.down(1240));
  const { id } = useParams();
  const [wishlist, setWishlist] = useState();
  const { isAuthenticated, token } = useSelector((state) => state.login);
  const [chapter, setChapter] = useState([]);
  const [enroll, setEnroll] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.course.isLoading);
  const location = useLocation();
  const course = useSelector((state) => state.course.courseData);
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`/course/wishlist/get/${id}`);
      console.log(response.data);
      setWishlist(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
  return () => {
    dispatch(setNull());
  };
}, [dispatch, location]);

useEffect(() => {
  dispatch(fetchCourse(id));
  fetchWishlist();
}, [dispatch, id]);

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
  const fetchData = async () => {
    try {
      const responseWishlist = await axios.get(`/course/wishlist/get/${id}`);
      console.log(responseWishlist.data);
      setWishlist(responseWishlist.data);

      const responseEnrollment = await axios.get(`/course/enrollment/${id}`);
      const isEnrolled = responseEnrollment.data.enrolled;
      setEnroll(isEnrolled);
      console.log(responseEnrollment.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [id]);

const showBlockedUserError = () => {
  Swal.fire({
    title: "Error!",
    text: "You are blocked",
    icon: "error",
    backdrop: false
  }).then(() => {
    dispatch(logout())
    navigate('/login');
  });
};


const handleEnrollUnenroll = async (enroll) => {
  if (user?.is_block === true) {
    showBlockedUserError();
  } else if (isAuthenticated) {
    try {
      let endpoint = enroll ? `/course/unenroll/${id}` : `/course/enroll/${id}`;
      const response = await axios.post(endpoint, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const successMessage = enroll ? "unenrolled" : "enrolled";
      await Swal.fire({
        position: "top-right",
        icon: "success",
        title: `You have successfully ${successMessage} from this course`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        timerProgressBar: true
      });

      const responseEnrollment = await axios.get(`/course/enrollment/${id}`);
      const isEnrolled = responseEnrollment.data.enrolled;
      setEnroll(isEnrolled);
    } catch (error) {
      console.log("error", error);
      if (error.response.data.is_blocked == true) {
        showBlockedUserError();
      } else {
        Swal.fire({
          position: "top-right",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          timerProgressBar: true
        });
      }
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
      timerProgressBar: true
    });
  }
};

const handleAddToWishlist = async () => {
  try {
    await axios.post("/course/wishlist/", { course_id: course?.course?.id });
    console.log("Course added to wishlist");
    fetchWishlist();
  } catch (error) {
    console.error(error);
  }
};

const handleRemoveFromWishlist = async () => {
  try {
    await axios.delete(`/course/wishlist/remove/${id}`);
    console.log("Course removed from wishlist");
    setWishlist(null);
  } catch (error) {
    console.error(error);
  }
};

const categories =
  course?.course?.cat &&
  course?.course?.cat.map((cat) => cat.name).join(", ");


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
                {course?.course?.title}
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
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                  // width: "500px"
                }}
              >
                {course?.course?.desc}
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
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                  // width: "500px"
                }}
              >
                <Typography fontWeight={"bold"}>
                  Rating &nbsp;:&nbsp;{" "}
                </Typography>
                {course?.course?.avg_rating === null
                  ? 0
                  : course?.course?.avg_rating}
                <Typography fontWeight={"bold"} marginLeft={2}>
                  Course By &nbsp;:&nbsp;{" "}
                </Typography>
                <Typography
                  onClick={() =>
                    navigate(
                      `/teacher-profile/${course?.course?.teacher?.user.name}/${course?.course?.teacher?.user.id}`
                    )
                  }
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {course?.course?.teacher?.user.name}
                </Typography>
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                alignContent="center"
                flexDirection="row"
                flexWrap="wrap"
              >
                {course?.course?.teacher?.user.id !== user?.id &&
                  (enroll ? (
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
                      onClick={() => handleEnrollUnenroll(enroll)}
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
                      onClick={() => handleEnrollUnenroll(enroll)}
                    >
                      <Typography
                        variant="h4"
                        className="text-white"
                        sx={{ color: "white", fontWeight: 100 }}
                      >
                        Enroll Now
                      </Typography>
                    </Button>
                  ))}

                {wishlist ? (
                  <IconButton
                    sx={{ marginTop: "40px", color: "#1d5564" }}
                    onClick={handleRemoveFromWishlist}
                  >
                    <FavoriteOutlinedIcon
                      sx={{ width: "4rem", height: "3rem" }}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ marginTop: "40px", color: "#1d5564" }}
                    onClick={handleAddToWishlist}
                  >
                    <FavoriteBorderIcon
                      sx={{ width: "4rem", height: "3rem" }}
                    />
                  </IconButton>
                )}
                {enroll && (
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      top: "1.1rem"
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={course?.progress}
                    />
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
                        {`${course?.progress}%`}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{ m: { xs: 2, sm: 4, md: 6 }, textAlign: "center" }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <img
                  className="shadow"
                  style={{
                    // width: { xs: "100%", sm: "70%" },
                    width: isMobile ? "fit-content" : "70%",
                    height: "auto",
                    maxWidth: "100%",
                    boxShadow: "rgb(0, 0, 0,1.3) 15px 10px 10px",
                    // marginLeft:'10px'
                    borderRadius: "8%",
                    [theme.breakpoints.up("sm")]: {
                      width: "100%"
                    }
                  }}
                  loading={"eager"}
                  src={course?.course?.image}
                  alt="placeholder"
                />
              )}
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
        display={isMobile && "flex"}
        sx={{ alignItems: isMobile && "flex-start" }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ paddingLeft: "4vw" }}>
          <NameOfCourses
            chapter={chapter}
            courseName={course?.course?.title}
            course_id={course?.course?.id}
            enroll={enroll}
          />
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
          <CourseReviews courseId={course?.course?.id} enroll={enroll} />
        </Grid>
      </Grid>
      <Box
        sx={{
          bottom: "0",
          display: "flex",
          flexDirection: "column",
          margin: " 0 20px 20px 0",
          maxWidth: "370px",
          position: "fixed",
          right: "0",
          width: "10vw",
          zIndex: "9999"
        }}
      >
        {(enroll || course?.course?.teacher?.user?.id === user?.id) && <Chat />}
      </Box>
    </div>
  );
}
