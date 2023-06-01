import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Typography,
  CircularProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from '../../axios'
import StarIcon from '@mui/icons-material/Star';
import { baseUrl } from "../../constants/baseUrl";
import { Link, useNavigate, useParams } from "react-router-dom";

const Courses = ({isTeacher = null,all=null}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const [cardData,setCardData] = useState([])
  const {teacher_id} = useParams()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    if (isTeacher){
      axios
      .get(`/course/teacher/course-list/${teacher_id}`)
      .then((response) => {
        setCardData(response.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
    axios.get("/course/user/course-list")
    .then((response)=>{
      setCardData(response.data)
      console.log(response.data);
      setIsLoading(false)

    })
    .catch((error)=>console.log(error));
  }
  },[])
const displayCourses = all?cardData: cardData.slice(0,6)
  return (
    <Box
      sx={{ width: "100vw", height: "100%", backgroundColor: "white", paddingBottom:3
    }}
      // mb={5}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px:{sm:1,md:3,lg:8,xs:0},
          marginLeft: {xs:"1rem",md:"2rem"}
        }}
      >
        <Box sx={{ width: {xs:240,lg:652} }}>
          <Typography
            variant="h2"
            sx={{
              color: "#1D5564",
              lineHeight: "3",
              fontWeight: "300",
              minWidth: "21rem",
              fontSize:{xs:"3vh",md:'2rem'}
            }}
          >
            {isTeacher?'Courses':'Browse courses'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            // pl: 8,
            pt: 4,
            pb: 5,
            mr:{xs:'6vw',md:'1vw'},
          }}
        >
   {(!isTeacher && !all) && (
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#1D5564",
      "&:hover": {
        backgroundColor: "#1D5564"
      },
      minWidth: { sm: '2vw', lg: '64px' }
    }}
    onClick={() => navigate('/courses')}
  >
    {" "}
    <Typography
      sx={{ fontSize: { sm: "10px", md: '10px', lg: '1rem', xs: '10px' }, fontWeight: "100", color: "white" }}
    >
      See More
    </Typography>
  </Button>
) }

        </Box>
      </Box>
        <Box display='flex' justifyContent='center'>
      {isLoading ? (
      <Grid container spacing={2} sx={{marginLeft:{sm:"2.5rem",lg:"3.5rem"},marginBottom:3,paddingRight:'3%',justifyContent:'center'}} my={3}>
          <CircularProgress />
          </Grid>
        ) : (
          <>
      <Grid container spacing={2} sx={{marginLeft:{sm:"2.5rem",lg:"3.5rem"},marginBottom:3,paddingRight:'3%'}} my={3}>
          {displayCourses.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box display='flex' justifyContent='center'>
      <Card
      key={card.id}
        sx={{
          background: "#ffffff",
          //  borderRadius: 10,
          boxShadow: "0 1px 4px 0 rgba(0,0,0,0.25)",
          // padding: "20px 13px",
          paddingBottom:'20px',
          width:'fit-content',
          marginLeft:'2rem',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          marginBottom:3

        }}
        
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {/* <div
            style={{
              backgroundImage:'url()',
              borderRadius: 10,
              flexShrink: 0,
              height: 192,
              width: 288,
              marginBottom:20
            }}
          /> */}
          <CardMedia
                  component="img"
                  alt="Placeholder Image"
                  height="220"
                  image={card.image}
                  // image={`${baseUrl}${card.image}`}
                  sx={{marginBottom:2}}
                  width='35vh'
                />
        </div>
        <Link to={`/course/detail/${card.id}`} style={{textDecoration:'none'}}>
        <p
          style={{
            
            fontFamily: "Public Sans,sans-serif",
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.25,
            margin: "20 0 0 4",
            color:'#1D5564',
            marginBottom:10,
            textDecoration:'none',
          }}
          >
          {card.title}
        </p>
          </Link>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            margin: "20 0 0 1"
          }}
        >
          <p
            style={{
              color: "#ff5d02",
              fontFamily: "Public Sans,sans-serif",
              fontSize: 12
            }}
          >
            {card.avg_rating===null?0:card.avg_rating}
          </p>
          
          <StarIcon sx={{color:'#ff5d02',width:'20',height:'18'}}/>
          {/* <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, marginLeft: 8 }}
          >
            <path
              d="M18.7808 6.78057L13.27 6.02384L10.8065 1.30499C10.7392 1.17579 10.6285 1.0712 10.4918 1.00762C10.1489 0.847664 9.73213 0.980965 9.56067 1.30499L7.09718 6.02384L1.58637 6.78057C1.43443 6.80108 1.29552 6.86876 1.18917 6.9713C1.0606 7.09616 0.989746 7.26415 0.992188 7.43835C0.994629 7.61254 1.07016 7.7787 1.20219 7.9003L5.18934 11.5733L4.24736 16.7597C4.22527 16.8803 4.2394 17.0044 4.28815 17.1179C4.3369 17.2313 4.41831 17.3296 4.52316 17.4015C4.62801 17.4735 4.7521 17.5162 4.88135 17.5249C5.01061 17.5336 5.13986 17.508 5.25446 17.4508L10.1836 15.0022L15.1127 17.4508C15.2473 17.5185 15.4036 17.541 15.5533 17.5164C15.931 17.4549 16.1849 17.1165 16.1198 16.7597L15.1778 11.5733L19.165 7.9003C19.2735 7.79981 19.3451 7.66856 19.3668 7.52501C19.4254 7.16612 19.1606 6.8339 18.7808 6.78057V6.78057Z"
              fill="#FF5D02"
            />
          </svg> */}

          <svg
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, marginLeft: 128 }}
          >
            <path
              d="M10.999 14.1679H9.99899V12.7507C9.9982 12.1244 9.73455 11.524 9.26588 11.0812C8.79721 10.6384 8.16179 10.3893 7.49899 10.3885H4.49899C3.8362 10.3893 3.20077 10.6384 2.7321 11.0812C2.26343 11.524 1.99979 12.1244 1.99899 12.7507V14.1679H0.998993V12.7507C1.00005 11.8739 1.36914 11.0333 2.02529 10.4134C2.68144 9.7934 3.57106 9.44466 4.49899 9.44366H7.49899C8.42692 9.44466 9.31655 9.7934 9.9727 10.4134C10.6288 11.0333 10.9979 11.8739 10.999 12.7507V14.1679Z"
              fill="black"
            />
            <path
              d="M0.5 2.82965C0.367392 2.82965 0.240215 2.87942 0.146447 2.96802C0.0526785 3.05662 0 3.17678 0 3.30208V7.55393H1V3.30208C1 3.17678 0.947321 3.05662 0.853553 2.96802C0.759785 2.87942 0.632608 2.82965 0.5 2.82965Z"
              fill="black"
            />
            <path
              d="M0 0.939941V1.8848H2.5V5.1918C2.5 6.06887 2.86875 6.91001 3.52513 7.5302C4.1815 8.15038 5.07174 8.4988 6 8.4988C6.92826 8.4988 7.8185 8.15038 8.47487 7.5302C9.13125 6.91001 9.5 6.06887 9.5 5.1918V1.8848H12V0.939941H0ZM3.5 1.8848H8.5V3.30208H3.5V1.8848ZM6 7.55394C5.33696 7.55394 4.70107 7.30507 4.23223 6.86208C3.76339 6.4191 3.5 5.81828 3.5 5.1918V4.24694H8.5V5.1918C8.5 5.81828 8.23661 6.4191 7.76777 6.86208C7.29893 7.30507 6.66304 7.55394 6 7.55394Z"
              fill="black"
            />
          </svg>

          <p
            style={{
              fontFamily: "Public Sans,sans-serif",
              fontSize: 12,
              marginLeft: 6
            }}
          >
            {card.enrollments} Students
          </p>
        </div>
        <div
          style={{
            alignItems: "end",
            display: "flex",
            margin: "16 0 0 1"
          }}
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <g clipPath="url(#clip0_2_360)">
              <path
                d="M8.99982 16.668C13.142 16.668 16.4998 13.3101 16.4998 9.16797C16.4998 5.02583 13.142 1.66797 8.99982 1.66797C4.85768 1.66797 1.49982 5.02583 1.49982 9.16797C1.49982 13.3101 4.85768 16.668 8.99982 16.668Z"
                stroke="#45C9C2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.25 12.168L9.4395 10.3575C9.15818 10.0762 9.00008 9.69476 9 9.29697V4.66797"
                stroke="#45C9C2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_360">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.167969)"
                />
              </clipPath>
            </defs>
          </svg>

          <p
            style={{
              fontFamily: "Public Sans,sans-serif",
              fontSize: 12,
              marginLeft: 6
            }}
          >
            {card.duration}
          </p>
          <svg
            width="14"
            height="19"
            viewBox="0 0 14 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, marginLeft: 20 }}
          >
            <path
              d="M13.3636 0.167969H0.636364C0.284375 0.167969 0 0.455246 0 0.810826V17.5251C0 17.8807 0.284375 18.168 0.636364 18.168H13.3636C13.7156 18.168 14 17.8807 14 17.5251V0.810826C14 0.455246 13.7156 0.167969 13.3636 0.167969ZM10.1023 5.83114L9.17756 5.15011L8.19318 5.86127V1.37333H10.1023V5.83114Z"
              fill="#FF7C32"
            />
          </svg>

          <p
            style={{
              fontFamily: "Public Sans,sans-serif",
              fontSize: 12,
              marginLeft: 6
            }}
          >
            Lectures
          </p>
          <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, marginLeft: 20 }}
          >
            <path
              d="M6.16216 9.16797H4.62162C4.33791 9.16797 4.10811 9.39172 4.10811 9.66797V15.668C4.10811 15.9442 4.33791 16.168 4.62162 16.168H6.16216C6.44588 16.168 6.67568 15.9442 6.67568 15.668V9.66797C6.67568 9.39172 6.44588 9.16797 6.16216 9.16797ZM2.05405 12.168H0.513514C0.229797 12.168 0 12.3917 0 12.668V15.668C0 15.9442 0.229797 16.168 0.513514 16.168H2.05405C2.33777 16.168 2.56757 15.9442 2.56757 15.668V12.668C2.56757 12.3917 2.33777 12.168 2.05405 12.168ZM10.2703 6.16797H8.72973C8.44601 6.16797 8.21622 6.39172 8.21622 6.66797V15.668C8.21622 15.9442 8.44601 16.168 8.72973 16.168H10.2703C10.554 16.168 10.7838 15.9442 10.7838 15.668V6.66797C10.7838 6.39172 10.554 6.16797 10.2703 6.16797ZM14.3784 3.16797H12.8378C12.5541 3.16797 12.3243 3.39172 12.3243 3.66797V15.668C12.3243 15.9442 12.5541 16.168 12.8378 16.168H14.3784C14.6621 16.168 14.8919 15.9442 14.8919 15.668V3.66797C14.8919 3.39172 14.6621 3.16797 14.3784 3.16797ZM18.4865 0.167969H16.9459C16.6622 0.167969 16.4324 0.391719 16.4324 0.667969V15.668C16.4324 15.9442 16.6622 16.168 16.9459 16.168H18.4865C18.7702 16.168 19 15.9442 19 15.668V0.667969C19 0.391719 18.7702 0.167969 18.4865 0.167969Z"
              fill={card.level === 'Easy' ? "#45C9C2" : card.level === 'Medium' ? "Orange" : card.level === 'Hard' ? "Red" : "none"}

            />
          </svg>

          <p
            style={{
              fontFamily: "Public Sans,sans-serif",
              fontSize: 12,
              marginLeft: 6
            }}
          >
            {card.level}
          </p>
        </div>
        
      </Card>
      </Box>
      </Grid>
      ))}
      </Grid>
      </>
      )}
      {/* </Grid> */}
      </Box>
    </Box>
  );
};

export default Courses;
