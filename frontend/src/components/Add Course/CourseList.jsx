import { useEffect, useState } from "react";
import axios from "../../axios";
import {
  Card,
  Table,
  Stack,
  Paper,
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
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Iconify from "../../Admin/iconify";
import Scrollbar from "../../Admin/scrollbar";
import { UserListHead, UserListToolbar } from "../Admin/sections/@dashboard/user";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  handleRequestSort,
  handleSelectAllClick,
  handleClick,
  handleChangePage,
  handleChangeRowsPerPage,
  handleFilterByName,
  applySortFilter,
  getComparator
} from "../Admin/pages/fuction";
// import CreateCourse from "../Modals/CreateCourse";
import { Link } from "react-router-dom";
import CreateCourse from "./Modals/CreateCourse";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "title", label: "Name", alignRight: false },
  { id: "image", label: "Image", alignRight: false },
  { id: "cat", label: "Categories", alignRight: false },
  { id: "enrollments", label: "Enrollments", alignRight: false },
  { id: "duration", label: "Duration", alignRight: false },
  { id: "level", label: "Level", alignRight: false },
  { id: "teacher", label: "Created By", alignRight: false },
  { id: "created_at", label: "Created At", alignRight: false },
  { id: "is_publish", label: "Public", alignRight: false },
  { id: "" }
];
export default function CourseList() {
  const [details, setDetails] = useState([]);
  const { token } = useSelector((state) => state.adminLogin);
  console.log("detail", details);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [NotFound, setNotFound] = useState(false);
  const teacher = JSON.parse(localStorage.getItem("teacher"))
  // useEffect(() => {
  //   axios
  //     .get("/course/course-list")
  //     .then((response) => {
  //       if (response.data.length === 0) {
  //         setNotFound(true);
  //       } else {
  //         setDetails(response.data);
  //         setNotFound(false);
  //       }
  //       console.log(response.data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);
  useEffect(() => {
    console.log("teacher",teacher.id);
    axios
      .get(`course/teacher/course-list/${teacher.id}`)
      .then((response) => {
        if (response.data.length === 0) {
          setNotFound(true);
        } else {
          setDetails(response.data);
          setNotFound(false);
        }
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, [openModal]);

  const handlePublish = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Press confirm to Publish/Unpublish",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      backdrop: false, // Disable backdrop overlay
      allowOutsideClick: false,
      showLoaderOnConfirm: true, // Display loading spinner
      preConfirm: async () => {
        try {
          Swal.showLoading(); // Show loading spinner
  
          await axios.post(`/course/publish/${id}`, null, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });
  
          setDetails((prevDetails) => {
            return prevDetails.map((user) => {
              if (user.id === id) {
                return {
                  ...user,
                  is_publish: !user.is_publish
                };
              }
              return user;
            });
          });
  
          return true;
        } catch (error) {
          Swal.showValidationMessage("Something went wrong");
          return false;
        }
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Course has been Publish/Unpublish.",
          icon: "success",
          backdrop: false // Disable backdrop overlay
        });
      }
    });
  };
  
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      backdrop: false // Disable backdrop overlay
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`/course/category/delete/${id}`, null, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            if (details.length === "1") {
              setNotFound(true);
            }
            console.log(details.length);
            const newData = details.filter((cat) => {
              return cat.id !== id;
            });
            setDetails(newData);
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
              backdrop: false // Disable backdrop overlay
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
  const handleRowClick = (event, name) => {
    handleClick(event, name, setSelected, selected);
  
  };
  const handleSelectAll = (event) => {
    handleSelectAllClick(event, setSelected, selected, details);
  };
  const handleFilter = (event) => {
    handleFilterByName(event, setPage, setFilterName);
  };
  const handleSort = (event, property) => {
    handleRequestSort(event, property, order, orderBy, setOrder, setOrderBy);
  };

  const handlePageChange = (event, newPage) => {
    handleChangePage(event, setPage, newPage);
  };
  const handleRowsPerPageChange = (event) => {
    handleChangeRowsPerPage(event, setPage, setRowsPerPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - details.length) : 0;

  const filteredUsers = applySortFilter(
    details,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <div>
      <Helmet>
        <title> Course </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Course
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            New Course
          </Button>
        </Stack>

        <Card sx={{ boxShadow: "13px 8px 7px rgba(0, 0, 0, 0.25)" }}>
          <UserListToolbar
            // numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilter}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={details.length}
                //   numSelected={selected.length}
                  onRequestSort={handleSort}
                //   onSelectAllClick={handleSelectAll}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        title,
                        image,
                        cat,
                        enrollments,
                        duration,
                        level,
                        teacher,
                        created_at,
                        is_publish
                      } = row;
                      const selectedUser = selected.indexOf(title) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          is_student="checkbox"
                          selected={selectedUser}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleRowClick(event, title)}
                            />
                          </TableCell> */}

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {" "}
                              <Typography variant="subtitle2" noWrap ml={2} sx={{textDecoration:'none'}}>
                              <Link to={`/courses/course-detail/${id}`} style={{textDecoration:'none',color:'blue'}}>
                                {title}
                                </Link>
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            <img src={image} alt={title} />
                          </TableCell>
                          <TableCell align="left">
                            {cat.map((category) => (
                              <div key={category.id}>{category.name}</div>
                            ))}
                          </TableCell>
                          <TableCell align="left">{enrollments}</TableCell>
                          <TableCell align="left">{duration}</TableCell>
                          <TableCell align="left">{level}</TableCell>
                          <TableCell align="left">{teacher.name}</TableCell>
                          <TableCell align="left">{created_at}</TableCell>
                          <TableCell align="left">
                            {is_publish ? "Yes" : "No"}
                          </TableCell>

                          <TableCell align="right">
                            <MenuItem onClick={() => handlePublish(id)}>
                              {is_publish ? (
                                <Iconify
                                  icon={"eva:checkmark-outline"}
                                  sx={{ mr: 2 }}
                                />
                              ) : (
                                <Iconify
                                  icon={"eva:slash-outline"}
                                  sx={{ mr: 2 }}
                                />
                              )}
                              {is_publish ? "Unpublish" : "Publish"}
                            </MenuItem>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {NotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center"
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for Try Again!
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center"
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={details.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Card>
        <CreateCourse onOpen={openModal} onCloseModal={handleCloseModal}/>
        
      </Container>
    </div>
  );
}
