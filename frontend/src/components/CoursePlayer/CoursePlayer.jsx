import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import ReactPlayer from "react-player";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
// import { ReactVideo } from "reactjs-media";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ListForPlay from "./ListForPlay";
// import logo from '../../assets/images/logo.png';
const CoursePlayer = () => {
  const navigate = useNavigate()
  const { courseName,course_id, chapter_id } = useParams();
  const [chapter, setChapter] = useState([]);

  useEffect(() => {
    axios
      .get(`/course/chapter/${chapter_id}`)
      .then((response) => {
        setChapter(response.data);
      })
      .catch((error) => console.log(error));
  }, [chapter_id]);
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
    >          <Toolbar>
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
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <ReactPlayer
          url={chapter.video}
          width="100%"
          height="75vh"
          controls
          style={{
            backgroundColor: "black"
          }}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload"
              }
            }
          }}
        />
      </Box>
      <ListForPlay/>
    </>
  );
};

export default CoursePlayer;
