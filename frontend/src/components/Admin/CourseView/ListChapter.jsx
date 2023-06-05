import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import axios from "../../../axios";
import Swal from "sweetalert2";

const ListChapter = ({ id, close }) => {
  const token = localStorage.getItem("admin-access");
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    axios
      .get(`/course/admin/${id}/chapter-list`)
      .then((response) => {
        setCardData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = async (chapter_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      backdrop: false, // Disable backdrop overlay
      reverseButtons: true,
      showLoaderOnConfirm: true
    });

    if (result.isConfirmed) {
      try {
        Swal.showLoading();
        await axios.post(`/course/chapter-delete/${chapter_id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        try {
          const response = await axios.get(`/course/${id}/chapter-list`);
          setCardData(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
        await Swal.fire({
          icon: "success",
          title: "Chapter Deleted",
          text: "The chapter deleted successfully!!.",
          backdrop: false // Disable backdrop overlay
        });
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          backdrop: false // Disable backdrop overlay
        });
      }
    }
  };

  useEffect(() => {
    axios
      .get(`/course/${id}/chapter-list`)
      .then((response) => {
        setCardData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [close]);

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "white",
        paddingBottom: 3
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: [2, 8], // adjust padding based on screen size
          marginLeft: ["1rem", "2rem"] // adjust margin based on screen size
        }}
      >
        <Box sx={{ width: ["100%", "auto", "auto", "auto", 652] }}>
          <Typography
            variant="h4"
            sx={{
              color: "#1D5564",
              lineHeight: "3",
              fontWeight: "300",
              minWidth: "20rem"
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
            pb: 5
          }}
        ></Box>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ marginLeft: "4.5rem", marginBottom: 3 }}
        my={3}
      >
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            sx={{
              background: "#ffffff",
              borderRadius: 0,
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.25)",
              // padding: "20px 13px",
              paddingBottom: "20px",
              width: "33vh",
              marginLeft: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
       
              <CardMedia
                component="video"
                controls
                height="220"
                image={card.video}
                sx={{ marginBottom: 2 }}
                controlsList="nodownload" // Add this line to remove download option
              />
            </div>
            <p
              style={{
                fontFamily: "Public Sans,sans-serif",
                fontSize: 18,
                fontWeight: 500,
                lineHeight: 1.25,
                margin: "20 0 0 4",
                color: "#1D5564",
                marginBottom: 10,
                textDecoration: "none"
              }}
            >
              {card.title}
            </p>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                margin: "20 0 0 1"
              }}
            >
              <p
                style={{
                  color: "#1D5564",
                  fontFamily: "Public Sans,sans-serif",
                  fontSize: 12
                }}
              >
                Order.No : {card.order}
              </p>
            </div>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(card.id)}
              sx={{ left: "11vh", top: "1vh" }}
            >
              Delete
            </Button>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default ListChapter;
