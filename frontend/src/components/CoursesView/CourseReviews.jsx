import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  Grid,
  Avatar,
  CircularProgress
} from "@mui/material";
import axios from "../../axios";
import { baseUrl } from "../../constants/baseUrl";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";

const CourseReviews = ({ courseId, enroll }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const MAX_REVIEWS_TO_DISPLAY = 5;
  const { id } = useParams();
  const handleShowAllReviews = () => {
    setShowAllReviews(true);
  };
  const handleShowLessReviews = () => {
    setShowAllReviews(false);
  };
  // Filter the reviews to display
  const displayedReviews = showAllReviews
    ? reviews
    : reviews.slice(0, MAX_REVIEWS_TO_DISPLAY);

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddReview = () => {
    const newReview = {
      rating: rating,
      review: review
    };

    // Make API call to add the review
    axios
      .post(`/course/${id}/reviews/`, newReview)
      .then((response) => {
        setReviews([...reviews, response.data]);
        setRating(0);
        setReview("");
        handleReview();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleReview = () => {
    axios
      .get(`/course/${id}/reviews/`)
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  };
  useEffect(() => {
    setIsLoading(true); // Start loading
    // Fetch existing reviews for the course
    handleReview();
  }, [id]);

  return (
    <div style={{ marginLeft: "4rem", marginRight: "1rem", marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom color="#1d5564">
        Course Reviews
      </Typography>

      {/* Form to add a review */}
      {enroll && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating name="rating" value={rating} onChange={handleRatingChange} />
          <TextField
            label="Write a review"
            variant="outlined"
            value={review}
            onChange={handleReviewChange}
            sx={{ ml: 2 }}
          />
          <Button variant="contained" onClick={handleAddReview} sx={{ ml: 2 }}>
            Submit
          </Button>
        </Box>
      )}
      {isLoading ? (
        <CircularProgress /> // Show loading spinner while fetching reviews
      ) : displayedReviews.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            // direction={isMobile ? "column" : "row"}
            bgcolor="white"
            mb="5vh"
          >
            {displayedReviews.map((review) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{ paddingLeft: "4vw" }}
              >
                <Box
                  key={review.id}
                  sx={{
                    mb: 2,
                    bgcolor: "gainsboro",
                    borderRight: "1px solid #9f9b9b",
                    // height:'15vh'
                    marginRight: "1rem"
                  }}
                >
                  <Box ml="1rem">
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      pt={"2rem"}
                      ml={"1rem"}
                    >
                      <Avatar
                        alt={review.user?.name}
                        src={review.user && `${baseUrl}${review.user?.image}`}
                      />
                      <Typography ml={"2rem"}>{review.user?.name}</Typography>
                    </Box>
                    <Box
                      sx={{
                        marginTop: "1rem",
                        paddingBottom: "1rem",
                        marginLeft: "3rem"
                      }}
                    >
                      <Typography>{review?.review}</Typography>
                      {/* <Typography fontWeight={'bold'}>
                Rating: {review?.rating}
              </Typography> */}
                      <Rating
                        name="text-feedback"
                        value={review?.rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          {reviews.length > MAX_REVIEWS_TO_DISPLAY ? (
            <Button
              variant="contained"
              onClick={
                showAllReviews ? handleShowLessReviews : handleShowAllReviews
              }
              sx={{ marginBottom: "2rem" }}
            >
              {showAllReviews ? "Show Less" : "Show More"}
            </Button>
          ) : null}
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No reviews yet.
        </Typography>
      )}
    </div>
  );
};

export default CourseReviews;
