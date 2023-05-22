import { Grid, Typography, TextField, Button } from "@mui/material";
import React from "react";

const Contact = () => {
  return (
    <Grid container spacing={2} mb={5} mt={5} bgcolor="#C1D3DF" marginBottom="1">
      <Grid item xs={12} md={6} >
        <Typography variant="h2" sx={{ fontWeight: "300", lineHeight: 3, color: "#1D5564",marginLeft:"2rem",px:8 }}>
          Contact us
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "lg", fontWeight: "thin", lineHeight: 1.2, color: "#1D5564",marginLeft:"2rem",px:8,minWidth:"70px" }}>
        Users can provide their thoughts, opinions, suggestions, or comments regarding a course, teacher, or experience.        </Typography>
      </Grid>
      <Grid item xs={12} md={6} >
        <Grid container spacing={2} sx={{width:"95%",margin:'auto',marginRight:'2rem'}}>
          <Grid item xs={12}>
            <TextField variant="outlined" fullWidth placeholder="Name" sx={{bgcolor:"white"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" fullWidth placeholder="Email" sx={{bgcolor:"white"}} />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" multiline rows={4} fullWidth placeholder="Message" sx={{bgcolor:"white"}} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ width: "fit-content",marginBottom:'10px' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;
