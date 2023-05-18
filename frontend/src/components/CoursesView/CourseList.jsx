import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    Typography
  } from "@mui/material";
import axios from'../../axios'

const CourseList = ({id,close}) => {
    const [cardData,setCardData] = useState([])
    useEffect(()=>{
      axios.get(`/course/${id}/chapter-list`)
      .then((response)=>{
        setCardData(response.data)
        console.log(response.data);
      })
      .catch((error)=>console.log(error));
    },[])
    useEffect(()=>{
        axios.get(`/course/${id}/chapter-list`)
        .then((response)=>{
          setCardData(response.data)
          console.log(response.data);
        })
        .catch((error)=>console.log(error));
      },[close])
   
  return (
    <Box
    sx={{
      height: "100%",
      backgroundColor: "white",
      paddingBottom: 3,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: [2, 8], // adjust padding based on screen size
        marginLeft: ["1rem", "2rem"], // adjust margin based on screen size
      }}
    >
      <Box sx={{ width: ["100%", "auto", "auto", "auto", 652] }}>
        <Typography
          variant="h4"
          sx={{
            color: "#1D5564",
            lineHeight: "3",
            fontWeight: "300",
            minWidth: "20rem",
          }}
        >
          All Chapter
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          pt: 4,
          pb: 5,
        }}
      ></Box>
    </Box>
    <Grid container spacing={2} sx={{ marginLeft: [0, "4.5rem"], marginBottom: 3 }} my={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            sx={{
              background: "#ffffff",
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.25)",
              paddingBottom: "20px",
              width: ["100%", "auto", "auto", "auto"],
              marginLeft: [0, "2rem"],
              marginBottom: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CardMedia
                component="video"
                controls
                height="220"
                src={card.video}
                sx={{ marginBottom: 2 }}
              />
            </div>
            <p
              style={{
                fontFamily: "Public Sans,sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                lineHeight: 1.25,
                margin: "20px 0 0 4px",
                color: "#1D5564",
                marginBottom: 10,
                marginTop: 5,
                textAlign: "center",
              }}
            >
              {card.order}.  {card.title}
            </p>
            {/* <Typography sx={{ textAlign: "center" }}>
              Order No : {card.order}
            </Typography> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
  
  )
}

export default CourseList