import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import axios from '../../axios';

const Profile = () => {
  const {user} = useSelector((state)=>state.login)
  const teacher = JSON.parse(localStorage.getItem("teacher"))
  const [userDetails,setUserDetails] = useState(teacher?teacher:user)
  const [open,setOpen]= useState(false)
  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
  }, []);
  const handleOpenModal = () => {
    setOpen(true);
};
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
    .get(`/view/user/${user.id}`)
    .then((response) => {
      setUserDetails(response.data);
      console.log(response.data);
      localStorage.setItem("user",JSON.stringify(response.data))
    })
    .catch((error) => console.error(error));
}, [open]);
  useEffect(() => {
    if (teacher){
    axios
    .get(`/request/teacher/${teacher.id}`)
    .then((response) => {
      setUserDetails(response.data);
      console.log(response.data);
      localStorage.setItem("teacher",JSON.stringify(response.data))
    })
    .catch((error) => console.error(error));
  }
}, [open]);


  return (
    <>
    <Paper
      style={{
        padding: '2rem',
        maxWidth: 400,
        margin: 'auto',
        marginTop:'5rem'
      }}
      elevation={3}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            src={userDetails?.image}
            alt="User Avatar"
            style={{
              width: '10rem',
              height: '10rem',
              marginBottom: '2rem',
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {userDetails.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" style={{ color: '#757575', marginBottom: '2rem' }}>
            {userDetails.email}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ marginBottom: '2rem' }}>
            {userDetails.bio}
          </Typography>
        </Grid>
          {/* <Link to='/teacher/register' style={{color:'blue'}}>If you want to become a teacher here?</Link> */}
          <Button variant='contained' onClick={handleOpenModal}>Edit</Button>
        {user.is_submit?null:(<Grid item>
          <Link to='/teacher/register' style={{color:'blue'}}>If you want to become a teacher here?</Link>
        </Grid>)}
      </Grid>
    </Paper>
    <EditProfile onOpen={open} onCloseModal={handleClose} userDetails={user}/>

    </>
  );
};

export default Profile;
