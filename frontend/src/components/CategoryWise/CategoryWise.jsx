import React from "react";
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";

const CategoryWise = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1240));

  

  return (
    <Box className="body" width='100vw' height='70vh' display='flex'>
      <Grid container spacing={2} alignItems="center" mb='5vh'>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{paddingLeft:'4vw'}}>
          <Box sx={{ m: { xs: 2, sm: 4, md: 6 },paddingLeft:'4vw',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Typography
              variant="h1"
              className="text-7xl text-gray-700"
              style={{
                // marginTop: isMobile ? 0 : 300,
                fontFamily:'Gilda Display, serif',
                fontWeight: 100,
                color: "#1D5564",
                maxWidth:isMobile?'70vh':'80vh'
              }}
            >
             Online learning is not the next big thing, it is the now big thing. 
            </Typography>

    
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};

export default CategoryWise;
