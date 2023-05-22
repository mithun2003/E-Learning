import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from '../../axios';
import {
  Card,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  CardContent,
  useMediaQuery,

} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { baseUrl } from "../../constants/baseUrl"; 
import TeacherEditProfile from "./TeacherEditProfile";




export default function TeacherProfile() {
  const [details, setDetails] = useState();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [isResumeOpen, setIsResumeOpen] = useState(false); // State to control the visibility of the resume dialog
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [open,setOpen]= useState(false)
  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
    console.log(details);

  }, []);
  const handleOpenModal = () => {
    setOpen(true);
};
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios
      .get(`/teacher/get/${user.id}`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [open]);

  const handleViewResume = () => {
    const resumeURL = `${baseUrl}${details.resume}`; // Prepend the base URL
    window.open(resumeURL, "_blank");
  };

  return (
    <div>
      <Helmet>
        <title>Teacher</title>
      </Helmet>

      <Container>
        <Stack direction="column" spacing={3}>
          <Typography variant="h4" gutterBottom>
            Teacher Details
          </Typography>

          <Card sx={{display:'flex',justifyContent:'center'}}>
          {/* <Typography variant="h6" gutterBottom>
            Teacher Details
          </Typography> */}
        <CardContent>

          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            <Avatar
              src={details && `${baseUrl}${details.user.image}`}
              alt={details && details.user.name}
              sx={{
                width: isMobile ? 200 : 100,
                height: isMobile ? 200 : 100,
                marginRight: isMobile ? 0 : '2rem',
              }}
            />

            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <Typography variant="h6" gutterBottom lineHeight={2.5}>
                Name &nbsp;:&nbsp; {details && details.user.name}
              </Typography>

              <Typography variant="body1" gutterBottom lineHeight={2.5}>
                Email &nbsp;:&nbsp; {details && details.user.email}
              </Typography>
              <Typography variant="body1" gutterBottom lineHeight={2.5}>
                Country &nbsp;:&nbsp; {details && details.user.country}
              </Typography>
              <Typography variant="body1" gutterBottom lineHeight={2.5}>
                Phone Number &nbsp;:&nbsp; {details && details.user.mobile_number}
              </Typography>

              <Typography variant="body1" gutterBottom lineHeight={2.5}>
                Qualification &nbsp;:&nbsp; {details?.highest_qualification}
              </Typography>

              <Typography variant="body1" gutterBottom lineHeight={2.5}>
                Address &nbsp;:&nbsp; {details?.address}
              </Typography>
              <Typography variant="body1" gutterBottom lineHeight={2.5}>
                Skills &nbsp;:&nbsp; {details?.skills}
              </Typography>

              <Typography variant="body1" gutterBottom lineHeight={2.5} mb={2.5}>
                Resume &nbsp;:&nbsp;
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleViewResume}
                  sx={{ marginLeft: '10px' }}
                >
                  View Resume
                </Button>
              </Typography>

              <Button
                variant="contained"
                color="primary"
                lineHeight={2.5}
                onClick={handleOpenModal}
              >
                Edit
              </Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
        </Stack>
      <TeacherEditProfile onOpen={open} onCloseModal={handleClose} userDetails={details}/>
      </Container>

    </div>
  );
}
