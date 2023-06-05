import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LiveList = ({ live }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [cardData, setCardData] = useState();
  const { teacher_id } = useParams();
  useEffect(() => {
    setCardData(live);
  }, []);

  const handleLive = (code) => {
    const url = "/live/" + code;
    window.open(url, "_blank", "width=1000,height=500"); // Open the URL in a new window
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100%",
        backgroundColor: "white",
        paddingBottom: 3
      }}
      // mb={5}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { sm: 1, md: 3, lg: 8, xs: 0 },
          marginLeft: { xs: "1rem", md: "2rem" }
        }}
      >
        <Box sx={{ width: { xs: 240, lg: 652 } }}>
          <Typography
            variant="h2"
            sx={{
              color: "#1D5564",
              lineHeight: "3",
              fontWeight: "300",
              minWidth: "21rem",
              fontSize: { xs: "3vh", md: "2rem" }
            }}
          >
            Live
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            // pl: 8,
            pt: 4,
            pb: 5,
            mr: { xs: "6vw", md: "1vw" }
          }}
        ></Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Grid
          container
          spacing={2}
          sx={{
            marginLeft: { sm: "2.5rem", lg: "3.5rem" },
            marginBottom: 3,
            paddingRight: "3%"
          }}
          my={3}
        >
          {cardData &&
            cardData.map((card) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box display="flex" justifyContent="center">
                  <Card
                    key={card.id}
                    sx={{
                      background: "#ffffff",
                      //  borderRadius: 10,
                      boxShadow: "0 1px 4px 0 rgba(0,0,0,0.25)",
                      // padding: "20px 13px",
                      paddingBottom: "20px",
                      width: "fit-content",
                      marginLeft: "2rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 3
                    }}
                    onClick={() => handleLive(card.room_code)}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="Placeholder Image"
                        height="220"
                        image={card.thumbnail}
                        sx={{ marginBottom: 2 }}
                        width="35vh"
                      />
                    </div>
                    {/* <Link to={`/course/detail/${card.id}`} style={{textDecoration:'none'}}> */}
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
                      {card.name}
                    </p>
                    {/* </Link>     */}
                  </Card>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LiveList;
