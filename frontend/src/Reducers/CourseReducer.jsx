import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    isLoading: true,
    courseData: null,
  },
  reducers: {
    setCourse: (state, action) => {
      state.courseData = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNull: (state) => {
      state.courseData = null;
      state.isLoading=true
    },
  },
});

export const { setCourse, setIsLoading, setNull } = courseSlice.actions;

// Define an async thunk to fetch the course data from the endpoint
export const fetchCourse = (courseId) => async (dispatch) => {
  try {
    const response = await axios.get(`/course/course-detail/${courseId}`);
    const courseData = response.data;
    dispatch(setCourse(courseData));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(true));
  }
};

export default courseSlice.reducer;
