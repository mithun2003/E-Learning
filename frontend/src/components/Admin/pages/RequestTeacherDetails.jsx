import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  MenuItem,
  TableContainer,
  TablePagination,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Label from "../../../Admin/label";
import Iconify from "../../../Admin/iconify";
import Scrollbar from "../../../Admin/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { filter } from "lodash";
import { id } from "date-fns/locale";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "email", alignRight: false },
  { id: "mobile_number", label: "Phone Number", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "is_active", label: "Verified", alignRight: false },
  { id: "is_blocked", label: "Status", alignRight: false },
  { id: "" }
  // { id: "" }
];

// ----------------------------------------------------------------------
// console.log(USERLIST);

export default function RequestTeacherDetail() {
  const [details, setDetails] = useState({});
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
  }, []);

  const handleViewResume = () => {
    const resumeURL = `http://localhost:8000${details.resume}`; // Prepend the base URL
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
      backdrop: false ,// Disable backdrop overlay
      reverseButtons: true,

    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/request/teacher/verify/${id}`,null,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            // const newData = details.filter((user) => {
            //   return user.id !== id;
            // });
            // setDetails(newData);
            Swal.fire({
              icon: "success",
              title: "Teacher Verified",
              text: "The teacher has been successfully verified.",
              backdrop: false // Disable backdrop overlay
            }).then(()=>{
              navigate('/admin/request/teacher')
            })
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
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/request/teacher/reject/${id}`,null,{
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
              backdrop: false, // Disable backdrop overlay
            }).then(() => {
              navigate("/admin/request/teacher");
            })
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              backdrop: false, // Disable backdrop overlay
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
                  src={details.image}
                  alt={details.name}
                  sx={{ width: 200, height: 200 }}
                />

                <div style={{ marginLeft: "20px", marginTop: "2rem" }}>
                  <Typography variant="h6" gutterBottom lineHeight={2.5}>
                    Name: {details.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Email: {details.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Country: {details.country}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Phone Number: {details.mobile_number}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Qualification: {details.highest_qualification}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Address: {details.address}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    Skills: {details.skills}
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
