import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';

const ListQuiz = ({progress}) => {
  const { course_id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [answers, setAnswers] = useState({});
//   const [course, setCourse] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`/course/course-detail/${course_id}`)
//       .then((response) => {
//         setCourse(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => console.log(error));
//     console.log(course);
//   }, [isOpen]);

  useEffect(() => {
    axios
      .get("/course/quiz/", {
        params: {
          course_id: course_id,
        },
      })
      .then((response) => {
        setCardData(response.data);
        
      })
      .catch((error) => console.log(error));
  }, [isOpen]);

  const handleClick = () => {
        setIsOpen(!isOpen);
   
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    console.log(answers)
    cardData.forEach((quiz) => {
      if (quiz.answer_type === 'checkbox') {
        if (answers[quiz.id] === quiz.correct_answer) {
          correctAnswers++;
        }
      } else {
        if (answers[quiz.correct_answer] === quiz.correct_answer) {
          correctAnswers++;
        }
      }
    });
  
    const completionPercentage = (correctAnswers / cardData.length) * 100;
  
    // let completionMessage = '';
    // if (completionPercentage === 100) {
    //     setCompletionMessage(`Congratulations! You completed the course perfectly!,${correctAnswers}`);
    //   } else if (completionPercentage >= 45) {
    //     setCompletionMessage(`Well done! You completed the course successfully,${correctAnswers}`);
    //   } else {
    //     setCompletionMessage(`You need to review the course again,${correctAnswers}`);
    //   }
  
    Swal.fire({
        icon: completionPercentage < 50 ? 'warning' : 'success',
        title: 'Quiz Completed!',
        text: completionPercentage >=50?`Congratulations! You completed the course perfectly! (points : ${correctAnswers} out of ${cardData.length})`:`You need to review the course again  (points : ${correctAnswers} out of ${cardData.length})`

    });

        setAnswers({})
    
  };
  const handleprogress = ()=>{
    if (progress!==100){
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Course',
            text: 'Please complete the course before attempting the quizzes.',
          });

        }
  }

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        py={3}
        pl={6}
        pr={4}
        height={48}
        width="80%"
        sx={{
          backgroundColor: '#1134',
          background: '#FFFFFF',
          border: '1px solid #DFE2E6',
          boxShadow:
            '0px 3px 3px -2px rgba(39, 44, 51, 0.1), 0px 3px 4px rgba(39, 44, 51, 0.04), 0px 1px 8px rgba(39, 44, 51, 0.02)',
          borderRadius: '8px',
          position: 'relative', // add position relative to container
        }}
        ml={{ xs: '2vh', sm: '4vh', md: '10vh', lg: '10vh' }}
        mb={1}
        onClick={progress===100 ? handleClick : handleprogress} // toggle the dropdown on click
      >
        <Typography
          variant="body2"
          fontWeight="medium"
          color="textPrimary"
          sx={{
            fontSize: { xs: '10px', sm: '12px', lg: '14px' },
            textDecoration: 'none',
          }}
        >
          Quizzes
        </Typography>
        <ExpandMoreIcon // add the ExpandMoreIcon at the end of the box
          sx={{
            marginLeft: 'auto', // push the icon to the right side
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', // rotate the icon based on open/closed state
            transition: 'transform 0.2s', // add transition effect for smooth rotation
          }}
        />
      </Box>
      {progress===100 && (<Collapse in={isOpen}>
        {cardData.map((quiz,index) => (
          <Box
            key={quiz.id}
            display="flex"
            justifyContent="flex-start"
            py={3}
            pl={6}
            pr={4}
            width="80%"
            sx={{
              backgroundColor: '#1134',
              background: '#FFFFFF',
              border: '1px solid #DFE2E6',
              boxShadow:
                '0px 3px 3px -2px rgba(39, 44, 51, 0.1), 0px 3px 4px rgba(39, 44, 51, 0.04), 0px 1px 8px rgba(39, 44, 51, 0.02)',
              borderRadius: '8px',
              top: '10%',
              position: 'relative', // add position relative to container
            }}
            ml={{ xs: '2vh', sm: '4vh', md: '10vh', lg: '10vh' }}
            mb={1}
          >
            <Typography
              variant="body2"
              fontWeight="medium"
              color="textPrimary"
              sx={{
                fontSize: { xs: '10px', sm: '12px', lg: '14px' },
                textDecoration: 'none',
              }}
            >
              {index+1}.&nbsp;&nbsp;{quiz.question}
            </Typography>
            {quiz.answer_type === "checkbox" ? (
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name={`quiz-${quiz.id}`}
                  sx={{ position: 'relative', top: '15%' }}
                  value={answers[quiz.id] || ''}
                  onChange={(event) =>{
                    console.log(event.target,event.target.value)

                    handleAnswerChange(quiz.id, event.target.value)}
                  }
                >
                  {quiz.option1 && <FormControlLabel
                    value={quiz.option1}
                    control={<Radio />}
                    label={quiz.option1}
                  />}
                  {quiz.option2 && <FormControlLabel
                    value={quiz.option2}
                    control={<Radio />}
                    label={quiz.option2}
                  />}
                  {quiz.option3 && <FormControlLabel
                    value={quiz.option3}
                    control={<Radio />}
                    label={quiz.option3}
                  />}
                  {quiz.option4 && <FormControlLabel
                    value={quiz.option4}
                    control={<Radio />}
                    label={quiz.option4}
                  />}
                </RadioGroup>
              </FormControl>
            ) : (
                <TextField
                label="Enter your answer"
                sx={{ position: 'relative', top: '3vh', marginBottom: 2 }}
                value={answers[quiz.correct_answer] || ''}
                onChange={(event) =>
                  handleAnswerChange(quiz.correct_answer, event.target.value)
                }
              />
            )}
          </Box>
        ))}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          py={3}
          pl={6}
          pr={4}
          width="80%"
          position="relative"
          ml={{ xs: '2vh', sm: '4vh', md: '10vh', lg: '10vh' }}
          mb={1}
        >
          <Button variant="contained" sx={{position:'relative',top:'5vh'}} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        {/* {completionMessage && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={3}
            pl={6}
            pr={4}
            width="80%"
            position="relative"
            ml={{ xs: '2vh', sm: '4vh', md: '10vh', lg: '10vh' }}
            mb={1}
          >
            <Typography variant="body2" fontWeight="medium" color="textPrimary">
              {completionMessage}
            </Typography>
          </Box>
        )} */}
      </Collapse>)
}
    </div>
  );
};

export default ListQuiz;
