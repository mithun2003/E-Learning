import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddQuiz from "./Modals/AddQuiz";
import axios from "../../axios";

const Quiz = ({ id }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("/course/quiz/", {
        params: {
          course_id: id
        }
      })
      .then((response) => {
        setCardData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [open]);

  return (
    <>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "white",
          paddingBottom: 3
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: [2, 8], // adjust padding based on screen size
            marginLeft: ["1rem", "2rem"] // adjust margin based on screen size
          }}
        >
          <Box sx={{ width: ["100%", "auto", "auto", "auto", 652] }}>
            <Typography
              variant="h4"
              sx={{
                color: "#1D5564",
                lineHeight: "3",
                fontWeight: "300",
                minWidth: "20rem"
              }}
            >
              Quizzes
            </Typography>
          </Box>
     
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              // pl: 8,
              pt: 4,
              pb: 5,
              mr: { xs: "6vw", md: "1vw" }
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1D5564",
                "&:hover": {
                  backgroundColor: "#1D5564"
                },
                minWidth: { sm: "2vw", lg: "64px" }
              }}
              onClick={handleOpen}
            >
              {" "}
              <Typography
                sx={{
                  fontSize: { sm: "10px", md: "10px", lg: "1rem", xs: "10px" },
                  fontWeight: "100",
                  color: "white"
                }}
              >
                Add Quiz
              </Typography>
            </Button>
          </Box>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ marginLeft: "4.5rem", marginBottom: 3 }}
          my={3}
        >
          {cardData && cardData.map((card) => (
            <Card
              key={card.id}
              sx={{
                background: "#ffffff",
                borderRadius: 0,
                boxShadow: "0 1px 4px 0 rgba(0,0,0,0.25)",
                paddingBottom: "20px",
                width: "33vh",
                marginLeft: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 3
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#1D5564",
                    lineHeight: "3",
                    fontWeight: "300",
                    marginBottom: "1rem",
                    textAlign: "center"
                  }}
                >
                  {card.question}
                </Typography>
                {card.answer_type === "checkbox" ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#1D5564",
                        lineHeight: "2",
                        fontWeight: "300",
                        marginBottom: "0.5rem"
                      }}
                    >
                      Options:
                    </Typography>
                    <ul style={{marginLeft:'2rem'}}>
                      <li>{card.option1}</li>
                      <li>{card.option2}</li>
                     <li>{card.option3}</li>
                     <li>{card.option4}</li>
                    
                    </ul>
                  </>
                ) :null}
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1D5564",
                    lineHeight: "2",
                    fontWeight: "300"
                  }}
                >
                  Correct Answer: {card.correct_answer}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="error"
                // onClick={() => handleDelete(card.id)}
                sx={{ left: "11vh", top: "1vh" }}
              >
                Delete
              </Button>
            </Card>
          ))}
        </Grid>
      </Box>
      <AddQuiz open={open} onClose={handleClose} id={id} />
    </>
  );
};

export default Quiz;
