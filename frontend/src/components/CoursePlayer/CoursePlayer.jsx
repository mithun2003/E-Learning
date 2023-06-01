import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import ReactPlayer from "react-player";
import {
  AppBar,
  Box,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
// import { ReactVideo } from "reactjs-media";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListForPlay from "./ListForPlay";
import { useTheme } from "@emotion/react";
import ListQuiz from "./ListQuiz";
// import logo from '../../assets/images/logo.png';
const CoursePlayer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1240));
  const navigate = useNavigate();
  const { courseName, course_id, chapter_id } = useParams();
  const [chapter, setChapter] = useState([]);
  const [course, setCourse] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [end,setEnd] = useState(false)
  useEffect(() => {
    axios
      .get(`/course/course-detail/${course_id}`)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    console.log(course);
  }, [end]);

  const handleEnroll = ()=>{
    axios
      .get(`/course/enroll/check/${course_id}`)
      .then((response) => {
        if (response.data===false){
          navigate(`/course/detail/${course_id}`)
        }
      })
      .catch((error) => console.log(error));
    console.log(course);
  }

  useEffect(() => {
    handleEnroll()
  }, [course_id]);


  const handleVideoCompletion = async () => {
    try {
      await axios.post(`/course/chapters/${chapter_id}/complete/`, {
        course_id: course_id
      });
      // Perform additional actions if needed
    } catch (error) {
      console.log(error);
    }
    setEnd(false)
  };

  const handleVideoEnded = () => {
    setEnd(true)
    handleVideoCompletion();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsPlaying((prevState) => !prevState);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    axios
      .get(`/course/chapter/${chapter_id}`)
      .then((response) => {
        setChapter(response.data);
      })
      .catch((error) => console.log(error));
  }, [chapter_id,end]);

  const handleGoBack = () => {
    navigate(`/course/detail/${course_id}`);
  };

  return (
    <>
      <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#C1D3DF",
            color: "#1D5564",
            borderBottom: "1px solid #1D5564",
            boxShadow: "none"
          }}
        >
          {" "}
          <Toolbar>
            {/* <Link to={`course/detail/${course_id}`}> */}
            <IconButton onClick={handleGoBack}>
              <ArrowBackIosIcon sx={{ marginLeft: "2%" }} />
            </IconButton>
            {/* </Link> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: "flex",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center"
              }}
            >
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                  alt="Logo"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              </Link>
            </Typography>
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                marginRight: "1rem"
              }}
            >
              <CircularProgress variant="determinate" value={course.progress} />
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
                  {`${course.progress === undefined ? 0 : course.progress}%`}
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <ReactPlayer
          url={chapter.video}
          playing={isPlaying}
          width="100%"
          id="video-player"
          height={!isMobile && "75vh"}
          controls
          style={{
            backgroundColor: "black",
            width: "100vw"
          }}
          
          onEnded={handleVideoEnded}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload"
              }
            }
          }}
          autoPlay
        />
      </Box>
      <ListForPlay end={end} progress={course.progress}/>
    </>
  );
};

export default CoursePlayer;
