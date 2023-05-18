import { Box, Typography, Divider, Grid, useMediaQuery } from "@mui/material";
import image from "../Navbar/logo.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useTheme } from "@emotion/react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Footer = () => {
    const theme = useTheme()
    const isMedium = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          backgroundColor: "#0A1927",
          width: "100vw",
        }}
        mb={5}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{position:'relative',width:isMedium?'100vw':'50vw',height:isMedium?'40vh':'50vh',display:'flex',justifyContent:'center'}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                    
            <img
                src={image}
                alt="Logo"
                style={{
                    position: "absolute",
                    display: "flex",
                    top: "12vh",
                    width: isMedium?70:93,
                    height: isMedium?70:90,
                    // left:'35vw',

                }}
                />
              <Typography
                variant="h4"
                sx={{
                    position: "relative",
                  left:'2%',
                  top: '25vh',
                  color: "#fff",
                  width: isMedium?"90%":'50%',
                  textAlign: "center",
                  fontWeight: 100,
                  height:'fit-content',
                  fontSize:{md:'16px',lg:'20px'},


                }}
              >
                Teaching in the Internet age means we must teach tomorrow's
                skills today
              </Typography>
              </div>
              {/* <img
                src={image}
                alt="Logo"
                style={{
                    position: "absolute",
                    left: 287,
                    top: 186,
                    width: 93,
                    height: 90
                }}
                /> */}
                </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                <Box sx={{ display: 'flex', flexDirection:{md:'row',lg:'column'},textAlign:'center',height:isMedium?'25vh':'50vh',alignItems:'center',position:'relative',justifyContent:'center' }}>

              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  
                  top:isMedium?0:156,
                  color: "#fff",
                  fontWeight: 100
                }}
              >
                Courses
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: isMedium?50:231,
                  color: "#fff",
                  fontWeight: 100
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  
                  top: isMedium?100:306,
                  color: "#fff",
                  fontWeight: 100
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: isMedium?150:381,
                  color: "#fff",
                  fontWeight: 100
                }}
              >
                Terms & Conditions
              </Typography>
            </Box>
          </Grid>
          </Grid>
         
          <Divider
            sx={{
              position: "absolute",
            //   left: 114,
            left:'50%',
            transform: 'translateX(-50%)',
            //   top: 556,
              width: '80vw',
              borderColor: "#737373",
              fontWeight: 100
            }}
          />
          <Box mt={5} mb={3}>
          
           <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
          <Box sx={{width:'100%',height:'fit-content',display:'flex',justifyContent:'space-around'}}>

          <Typography
            variant="body1"
            sx={{
                fontSize:{md:'10px',lg:'20px',sm:'10px',xs:'10px'},

            //   position: "absolute",
            //   left: 320,
            //   top: 605,
              color: "#fff",
              fontWeight: 100
            }}
          >
            ©2023 E-Learning
          </Typography>
          <Typography
            variant="body1"
            sx={{
                fontSize:{md:'10px',lg:'20px',sm:'10px',xs:'10px'},
            //   position: "absolute",
            //   left: 785,
            //   top: 605,
              color: "#fff",
              fontWeight: 100,
              height:'fit-content'
            }}
          >
            E-Learning
          </Typography>
          <Typography
            variant="body1"
            sx={{
                fontSize:{md:'10px',lg:'20px',sm:'10px',xs:'10px'},

            //   position: "absolute",
            //   left: 1235,
            //   top: 606,
              color: "#fff",
              fontWeight: 100
            }}
          >
            Powered by Mithun Thomas
          </Typography>
          </Box>
          </Grid>
          </Grid>
          <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
          <Box sx={{width:'100%',height:'fit-content',display:'flex',justifyContent:'space-around',marginLeft:isMedium?'-6vw':'-2vw'}}>
          <TwitterIcon
            sx={{
            //   position: "absolute",
            //   left: 1325,
            //   top: 673,
              width: isMedium?45:70,
              height: isMedium?60:80,
              color: "white"
            }}
          />
          <InstagramIcon
            sx={{
            //   position: "absolute",
            //   left: 354,
            //   top: 665,
            width: isMedium?45:70,
            height: isMedium?60:80,
              color: "white"
            }}
          />
          <FacebookIcon
            sx={{
            //   position: "absolute",
              //   left: 802,
            //   top: 673,
            width: isMedium?45:70,
            height: isMedium?60:80,
              color: "white"
            }}
            />
            </Box>
        </Grid>
        </Grid>
        </Box>
      </Box>
    </>
    // {/* </Box> */}
  );
};

export default Footer;
