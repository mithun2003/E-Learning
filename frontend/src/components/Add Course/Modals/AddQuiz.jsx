import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import axios from "../../../axios";
const AddQuiz = ({ open, onClose, id }) => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");
  const [answerType, setAnswerType] = useState("checkbox"); // Assuming default answer type is checkbox
  const [errors, setErrors] = useState({});

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setOption3(event.target.value);
  };

  const handleOption4Change = (event) => {
    setOption4(event.target.value);
  };

  const handleCorrectAnswerChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const errors = {};

    if (!question.trim()) {
      errors.question = "Please enter a question";
    }

    if (answerType === "checkbox") {
      if (!option1.trim()) {
        errors.option1 = "Please enter option 1";
      }
      // if (!option2.trim()) {
      //   errors.option2 = "Please enter option 2";
      // }
      // if (!option3.trim()) {
      //   errors.option3 = "Please enter option 3";
      // }
      // if (!option4.trim()) {
      //   errors.option4 = "Please enter option 4";
      // }
    }

    if (!correctAnswer.trim()) {
      errors.correctAnswer = "Please enter the correct answer";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const quizData = {
      course: id,
      question,
      correct_answer: correctAnswer,
      answer_type: answerType
    };

    if (answerType === "checkbox") {
      quizData.option1 = option1;
      quizData.option2 = option2;
      quizData.option3 = option3;
      quizData.option4 = option4;
    }

    axios
      .post("/course/quiz/", quizData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        // Reset form fields and close the dialog
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCorrectAnswer("");
        setErrors({});
        onClose();
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        setErrors({ submit: "Failed to add quiz" });
      });
  };

  const handleClose = () => {
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Quiz</DialogTitle>
      <DialogContent>
        <TextField
          label="Question"
          value={question}
          onChange={handleQuestionChange}
          fullWidth
          error={errors.question}
          helperText={errors.question && "Please enter a question"}
          sx={{ marginBottom: 2 ,marginTop:2}}
        />
        <FormControl sx={{ marginBottom: 2 }}>
          <InputLabel>Answer Type</InputLabel>
          <Select
            label="Answer Type"
            value={answerType}
            onChange={(event) => setAnswerType(event.target.value)}
          >
            <MenuItem value="checkbox">Checkbox</MenuItem>
            <MenuItem value="textfield">Text Field</MenuItem>
          </Select>
        </FormControl>
        {answerType === "checkbox" && (
          <>
            <TextField
              label="Option 1"
              value={option1}
              onChange={handleOption1Change}
              fullWidth
              error={errors.option1}
              helperText={errors.option1 && "Please enter a option"}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Option 2"
              value={option2}
              onChange={handleOption2Change}
              fullWidth
              error={errors.option2}
              helperText={errors.option2 && "Please enter a option"}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Option 3"
              value={option3}
              onChange={handleOption3Change}
              fullWidth
              error={errors.option3}
              helperText={errors.option3 && "Please enter a option"}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Option 4"
              value={option4}
              onChange={handleOption4Change}
              fullWidth
              error={errors.option4}
              helperText={errors.option4 && "Please enter a option"}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}
        <TextField
          label="Correct Answer"
          value={correctAnswer}
          onChange={handleCorrectAnswerChange}
          fullWidth
          error={errors.correctAnswer}
          helperText={errors.correctAnswer && "Please enter a option"}
          sx={{ marginBottom: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuiz;
