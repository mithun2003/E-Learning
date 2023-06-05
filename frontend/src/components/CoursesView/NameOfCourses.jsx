import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NameOfCourses = ({ chapter, courseName, course_id, enroll }) => {
  return (
    <>
      <Box
        sx={{ m: { xs: 2, sm: 6, md: 6 }, paddingLeft: "1vw" }}
        bgcolor="white"
        mt="5vh"
        mb="15vh"
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
            {enroll ? (
              <Link to={`/course/${course_id}/${courseName}/${chapter.id}`}>
                <Typography
                  variant="body2"
                  fontWeight="medium"
                  color="textPrimary"
                  sx={{
                    mr: "15vh",
                    fontSize: { xs: "10px", sm: "12px", lg: "14px" }
                  }}
                >
                  {chapter.order}.&nbsp;&nbsp;{chapter.title}
                </Typography>
              </Link>
            ) : (
              <Typography
                variant="body2"
                fontWeight="medium"
                color="textPrimary"
                sx={{
                  mr: "15vh",
                  fontSize: { xs: "10px", sm: "12px", lg: "14px" }
                }}
              >
                {chapter.order}.&nbsp;&nbsp;{chapter.title}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default NameOfCourses;
