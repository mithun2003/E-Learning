import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "../../axios";
import { useTheme } from '@emotion/react';
import { baseUrl } from '../../constants/baseUrl';

const TeacherDetails = ({teacher_id}) => {
    const [teacher,setTeacher] = useState()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(1240));
    useEffect(()=>{
        axios
          .get(`/teacher/get/${teacher_id}`)
          .then((response) => {
            setTeacher(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      },[teacher_id])
      return (
        <Box bgcolor='#C1D3DF'>
        <Typography
              variant="h2"
              sx={{
                fontWeight: "300",
                lineHeight: 3,
                color: "#1D5564",
                marginLeft: "2rem",
                px: 8
              }}
            >
              Teacher Details
            </Typography>
        <Grid
          container
          spacing={2}
          mb={5}
          mt={5}
          bgcolor="#C1D3DF"
          marginBottom="1"
        >
          <Grid item xs={12} md={6}>
            
            {/* <Typography
              variant="body1"
              sx={{
                fontSize: "lg",
                fontWeight: "thin",
                lineHeight: 1.2,
                color: "#1D5564",
                marginLeft: "2rem",
                px: 8,
                minWidth: "70px"
              }}
            >
              
            </Typography> */}
            <img src={`${baseUrl}${teacher?.user?.image}`} alt={teacher?.user?.name}/>
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
        </Box>
      );
}

export default TeacherDetails