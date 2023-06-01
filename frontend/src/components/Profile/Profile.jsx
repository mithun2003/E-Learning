import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import axios from '../../axios';
import TeacherEditProfile from './TeacherEditProfile';
import { baseUrl } from '../../constants/baseUrl';
import TeacherProfile from './TeacherProfile';
import Label from '../../Admin/label/Label';

const Profile = () => {
  const {user} = useSelector((state) => state.login);
  const teacher = JSON.parse(localStorage.getItem("teacher"))
  const [userDetails,setUserDetails] = useState()
  const [open,setOpen]= useState(false)
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch()
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
    if (teacher){
    // axios
    // .get(`/teacher/get/${user.id}`)
    // .then((response) => {
    //   setUserDetails(response.data);
    //   console.log(response.data);
    //   localStorage.setItem("teacher",JSON.stringify(response.data))
    // })
    // .catch((error) => console.error(error));
    fetchTeacher()
  }
}, []);

const fetchTeacher=()=>{
  axios
  .get(`/teacher/get/${user.id}`)
  .then((response) => {
    setUserDetails(response.data);
    console.log(response.data);
    localStorage.setItem("teacher",JSON.stringify(response.data))
  })
  .catch((error) => console.error(error));
}

useEffect(() => {
  axios
    .get(`/view/user/${user.id}`)
    .then((response) => {
      setUserDetails(response.data);
      if (response.data.is_teacher){
        fetchTeacher()
      }
      setLoading(false); // Set loading state to false once data is fetched

      console.log(response.data);
    })
    .catch((error) => console.error(error));
}, []);

if (loading) {
  // Render spinner or loading state while fetching user details
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress/>
    </div>
  );
}
  return (
    <>
    {teacher?
  <TeacherProfile/>
  :
  (<>
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
            alt={userDetails?.name} src={userDetails && `${baseUrl}${userDetails.image}`} 
            style={{
              width: '10rem',
              height: '10rem',
              marginBottom: '2rem',
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {userDetails && userDetails.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" style={{ color: '#757575', marginBottom: '2rem' }}>
            {userDetails && userDetails.email}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ marginBottom: '2rem' }}>
            {userDetails && userDetails.mobile_number}
          </Typography>
        </Grid>
          {/* <Link to='/teacher/register' style={{color:'blue'}}>If you want to become a teacher here?</Link> */}
          <Button variant='contained' onClick={handleOpenModal}>Edit</Button>
        {userDetails?.is_submit?null:(<Grid item>
          <Link to='/teacher/register' style={{color:'blue'}}>If you want to become a teacher here?</Link>
        </Grid>)}
        {userDetails?.is_pending?(<Grid item>
          <span>Application is on </span>&nbsp;
          <Label color={userDetails?.is_pending ? "warning" : "success"}>
                      {userDetails?.is_pending ? "Pending..." : "Verified"}
              </Label>        </Grid>):null}
      </Grid>
    </Paper>
    <EditProfile onOpen={open} onCloseModal={handleClose} userDetails={userDetails}/>
    </>)
  }
  </>
  );
};

export default Profile;
