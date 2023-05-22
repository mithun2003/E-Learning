import { Box, List, ListItem, ListItemIcon, ListSubheader, Typography } from '@mui/material'
import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CatergoryPage from '../Admin/pages/CategoryPage';

const AboutCourse = ({course,categories}) => {

  return (
    <>
    <Box sx={{ m: { xs: 2, sm: 6, md: 6 },paddingLeft:'1vw' }} bgcolor='white' mt='5vh' mb='15vh'>
      <Typography
        variant="h5"
        sx={{ mt: 4 }}
        ml={{ xs:'2vh',sm: "4vh", md: "10vh", lg: "10vh" }}
        color="#212B36"
        mb={3}
      >
        About the Course
      </Typography>
      <List sx={{marginLeft:{ xs:'2vh',sm: "4vh", md: "10vh", lg: "10vh" }}}>
        <ListItem>
          <ListItemIcon sx={{minWidth:'40px'}}>
            <FiberManualRecordIcon sx={{fontSize:'11px', color:'#212B36'}} />
          </ListItemIcon>
          <Typography variant="body1" component="span" color="#212B36">
            {course.duration} duration
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{minWidth:'40px'}}>
            <FiberManualRecordIcon sx={{fontSize:'11px', color:'#212B36'}} />
          </ListItemIcon>
          <Typography variant="body1" component="span" color="#212B36">
            {course.enrollments} students enrolled
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{minWidth:'40px'}}>
            <FiberManualRecordIcon sx={{fontSize:'11px', color:'#212B36'}} />
          </ListItemIcon>
          <Typography variant="body1" component="span" color="#212B36">
            You will learn about {categories}
          </Typography>
        </ListItem>
      </List>
      </Box>
    </>
  )
}

export default AboutCourse