import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import {
  Card,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  CardContent,

} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { baseUrl } from "../../../constants/baseUrl";
import Label from "../../../Admin/label/Label";




export default function RequestTeacherDetail() {
  const [details, setDetails] = useState();
  const [isResumeOpen, setIsResumeOpen] = useState(false); // State to control the visibility of the resume dialog
  const { token } = useSelector((state) => state.adminLogin);
  const navigate = useNavigate();
  console.log(details);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/request/teacher/${id}`)
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleViewResume = () => {
    const resumeURL = `${baseUrl}${details.resume}`; // Prepend the base URL
    window.open(resumeURL, "_blank");
  };
  const handleVerify = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Verify",
      cancelButtonText: "Cancel",
      backdrop: false,
      reverseButtons: true,
      allowOutsideClick: false,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          Swal.showLoading();
          await axios.post(`/request/teacher/verify/${id}`, null, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          return true;
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong.',
            icon: 'error',
            backdrop: false
          });
          return false;
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Teacher Verified',
          text: 'The teacher has been successfully verified.',
          backdrop: false
        }).then(() => {
          navigate('/admin/request/teacher');
        });
      }
    });
  };
  
  const handleReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      backdrop: false, // Disable backdrop overlay
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/request/teacher/reject/${id}`, null, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Teacher Rejected",
              text: "The teacher request has been rejected.",
              backdrop: false // Disable backdrop overlay
            }).then(() => {
              navigate("/admin/request/teacher");
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              backdrop: false // Disable backdrop overlay
            });
          });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Verification</title>
      </Helmet>

      <Container>
        <Stack direction="column" spacing={3}>
          <Typography variant="h4" gutterBottom>
            Verification
          </Typography>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Teacher Details
              </Typography>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={details && `${baseUrl}${details.user.image}`}
                  alt={details && details.user.name}
                  sx={{ width: 200, height: 200 }}
                />

                <div style={{ marginLeft: "10%", marginTop: "2rem" }}>
                  <Typography variant="h6" gutterBottom lineHeight={2.5}>
                    Name: {details && details.user.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Email: {details && details.user.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Country: {details && details.user.country}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Phone Number: {details && details.user.mobile_number}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Qualification: {details?.highest_qualification}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Address: {details?.address}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Skills: {details?.skills}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Block:  <Label color={details && details.user.is_block ? "error" : "success"}>
                              {details && details.user.is_block ? "Banned" : "Active"}
                            </Label>
                  </Typography>

                  <Typography
                    variant="body1"
                    gutterBottom
                    lineHeight={2.5}
                    mb={2.5}
                  >
                    Resume :
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleViewResume}
                      sx={{ marginLeft: "10px" }}
                    >
                      View Resume
                    </Button>
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleVerify}
                    lineHeight={2.5}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleReject}
                    sx={{ marginLeft: "10px" }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
