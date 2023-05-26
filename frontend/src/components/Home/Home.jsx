import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import image from "./banner.jpg";
import axios from '../../axios'
const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1240));
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios
      .get("/banner/user")
      .then((response) => {
          setDetails(response.data);
        
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box className="body">
      <Grid container spacing={2} alignItems="center" direction={isMobile ? "column-reverse" : "row"} mb='5vh'>
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{paddingLeft:'4vw'}}>
          <Box sx={{ m: { xs: 2, sm: 4, md: 6 },paddingLeft:'4vw' }}>
            <Typography
              variant="h1"
              className="text-7xl text-gray-700"
              style={{
                marginTop: isMobile ? 0 : 300,
                fontFamily:'Gilda Display, serif',
                fontWeight: 100,
                color: "#1D5564",
              }}
            >
              Start learning
              <br />
              new things <br />
              online today
            </Typography>

            <Button
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 50,
                backgroundColor: "#1D5564",
                marginTop: 5,
              }}
            >
              <Typography variant="h4" className="text-white" sx={{color:"white",fontWeight:100}}>
                Start Here
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Box sx={{ m: { xs: 2, sm: 4, md: 6 }, textAlign: "center" }}>
            <img
              className="shadow"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                borderRadius:'2%'
                // marginLeft:'10px'
              }}
              src={details.image}
              alt="placeholder"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
