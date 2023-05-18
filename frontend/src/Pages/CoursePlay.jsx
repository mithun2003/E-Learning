import React, { useEffect } from 'react'
import CoursePlayer from '../components/CoursePlayer/CoursePlayer';

const CoursePlay = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#C1D3DF";
  }, []);
  return (
    <div>
      <CoursePlayer/>
    </div>
  )
}

export default CoursePlay
