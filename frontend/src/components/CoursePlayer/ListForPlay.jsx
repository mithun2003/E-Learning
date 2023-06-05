import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../axios";
import ListQuiz from "./ListQuiz";

const ListForPlay = ({ end }) => {
  const [chapter, setChapter] = useState([]);
  const { courseName, course_id } = useParams();

  useEffect(() => {
    axios
      .get(`/course/${course_id}/chapter-list`)
      .then((response) => {
        setChapter(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [course_id, end]);

  return (
    <>
      <Box
        sx={{ m: { xs: 2, sm: 6, md: 6 }, paddingLeft: "1vw" }}
        bgcolor="white"
        mt="5vh"
        mb="15vh"
        pt="2rem"
        pb="12rem"
        width="94vw"
      >
        <Typography
          variant="h5"
          sx={{ mt: 4 }}
          ml={{ xs: "2vh", sm: "4vh", md: "10vh", lg: "10vh" }}
          color="textPrimary"
          mb={3}
        >
          What we'll cover in this course
        </Typography>
        {chapter.map((chapter) => (
          <Box
            key={chapter.id}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            py={3}
            pl={6}
            pr={4}
            height={48}
            width="80%"
            sx={{
              backgroundColor: "#1134",
              background: "#FFFFFF",
              border: "1px solid #DFE2E6",
              boxShadow:
                " 0px 3px 3px -2px rgba(39, 44, 51, 0.1), 0px 3px 4px rgba(39, 44, 51, 0.04), 0px 1px 8px rgba(39, 44, 51, 0.02)",
              borderRadius: "8px",
              position: "relative" // add position relative to container
            }}
            ml={{ xs: "2vh", sm: "4vh", md: "10vh", lg: "10vh" }}
            mb={1}
          >
            {/* <Checkbox disabled={chapter.is_completed} checked={chapter.is_completed} /> */}
            <Checkbox
              disabled={chapter.completed}
              checked={chapter.completed}
              style={{ color: chapter.completed ? "#000000" : "#black" }}
            />
            <Link
              to={`/course/${course_id}/${courseName}/${chapter.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                fontWeight="medium"
                color="textPrimary"
                sx={{
                  fontSize: { xs: "10px", sm: "12px", lg: "14px" },
                  textDecoration: "none"
                }}
              >
                {chapter.order}.&nbsp;&nbsp;{chapter.title}
              </Typography>
            </Link>
          </Box>
        ))}
        <ListQuiz />
      </Box>
    </>
  );
};

export default ListForPlay;
