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
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CreateCourse from "../Modals/CreateCourse";
import EditCourse from "../Modals/EditCourse";
import ChapterAdd from "../Modals/ChapterAdd";
import ListChapter from "../CourseView/ListChapter";

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// console.log(USERLIST);

export default function CourseDetail() {
  const [details, setDetails] = useState({});
  const { token } = useSelector((state) => state.adminLogin);
  const navigate = useNavigate();
  const { id } = useParams();
  const [open,setOpen]= useState(false)
  const [openAdd,setOpenAdd]= useState(false)
  console.log(details);
  useEffect(() => {
      axios
      .get(`/course/admin/course-detail/${id}`)
      .then((response) => {
          setDetails(response.data);
          
          console.log(response.data);
          console.log(details);
      })
      .catch((error) => console.error(error));
  }, [open,id]);
  // useEffect(() => {
  //     axios
  //     .get(`/course/course-detail/${id}`)
  //     .then((response) => {
  //         setDetails(response.data);
          
  //         console.log(response.data);
  //         console.log(details);
  //     })
  //     .catch((error) => console.error(error));
  // }, [open]);

  const handleOpenModal = () => {
    setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddOpenModal = () => {
    setOpenAdd(true);
};

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleDelete = async () => {
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
      showLoaderOnConfirm: true,
    });
  
    if (result.isConfirmed) {
      try {
        Swal.showLoading();
        await axios.post(`/course/course-delete/${id}`, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        await Swal.fire({
          icon: "success",
          title: "Course Deleted",
          text: "The course deleted successfully!!.",
          backdrop: false, // Disable backdrop overlay
        });
        navigate("/admin/courses");
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          backdrop: false, // Disable backdrop overlay
        });
      }
    }
  };
  
  return (
    <div>
      <Helmet>
        <title>Course Details</title>
      </Helmet>

      <Container>
        <Stack direction="column" spacing={3}>
          <Typography variant="h4" gutterBottom>
            Course
          </Typography>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {details?.title}
              </Typography>

              <div style={{ display: "flex",flexDirection:'column', alignItems: "center" }}>
                <Avatar
                  src={details?.image}
                  alt={details?.title}
                  sx={{ width: 'fit-content', height: 'fit-content',borderRadius:0 }}
                />

                <div style={{ marginLeft: "20px", marginTop: "2rem" }}>
                  <Typography variant="h6" gutterBottom lineHeight={2.5}>
                    Name:  {details?.title}
                  </Typography>

                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    <b>Description:</b>  {details?.desc}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                    <b>Level:</b>  {details?.level}
                  </Typography>
  <Typography variant="body1" lineHeight={2.5}>
                 <b> Category :</b>
              {details?.cat && details.cat.map(cat => (
                // <Typography variant="body1" key={cat.id} gutterBottom lineHeight={2.5}>
                  <span key={cat.id} style={{lineHeight:2.5}}>
                      &nbsp;{cat.name},
                  </span>
                // {/* </Typography> */}
))}
</Typography>

                  { details?.teacher && <Typography variant="body1" gutterBottom lineHeight={2.5}>
                  <b>Teacher:</b>  {details?.teacher.user?.name}
                  </Typography>}
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                  <b>Enrollments:</b>  {details?.enrollments}
                  </Typography>
                  <Typography variant="body1" gutterBottom lineHeight={2.5}>
                  <b>Duration:</b>  {details?.duration}
                  </Typography>


                  <Button
                    variant="contained"
                    sx={{backgroundColor:'#21b726',
                    '&:hover': { bgcolor: '#21b726',opacity:"0.9" },
                    marginLeft: "10px" 
                      }}
                    onClick={handleAddOpenModal}
                  >
                    Add Chapter
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: "10px" }}
                    onClick={handleOpenModal}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        <EditCourse onOpen={open} onCloseModal={handleClose} id={id}/>
        <ChapterAdd onOpen={openAdd} onCloseModal={handleAddClose} id={id} token={token}/>
        </Stack>
        <ListChapter id={id} close={handleAddClose}/>
      </Container>
    </div>
  );
}
