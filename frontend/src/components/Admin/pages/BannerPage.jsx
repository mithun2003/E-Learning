import { useEffect, useRef, useState } from "react";
import axios from "../../../axios";
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  MenuItem,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableHead,
  TableSortLabel
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Iconify from "../../../Admin/iconify";
import Scrollbar from "../../../Admin/scrollbar";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { handleChangePage, handleChangeRowsPerPage } from "./fuction";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "title", label: "Name", alignRight: false },
  { id: "image", label: "Image", alignRight: false },
  { id: "created_at", label: "Created At", alignRight: false },
  { id: "active", label: "Active", alignRight: false },
  { id: "" },
  { id: "" },
  { id: "" },
  { id: "" },
  { id: "" }
];

export default function BannerPage() {
  const [details, setDetails] = useState([]);
  const { token } = useSelector((state) => state.adminLogin);
  console.log("detail", details);
  const fileRef = useRef();

  const handlePublish = async (id) => {
    try {
      const result = await Swal.fire({
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
        allowOutsideClick: false
      });

      if (result.isConfirmed) {
        Swal.showLoading(); // Show loading spinner
        await axios.post(`/banner/${id}`);
        const response = await axios.get("/banner");
        setDetails(response.data);
        Swal.fire({
          title: "Success!",
          text: "Banner has been Active/Deactivate.",
          icon: "success",
          backdrop: false // Disable backdrop overlay
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        backdrop: false
      });
    }
  };

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(" ");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [NotFound, setNotFound] = useState(false);
  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    const name = e.target.files[0];
    console.log(file);
    console.log(file);
    if (file && name.type.startsWith("image/")) {
      setImage(file);
    } else {
      setError("Image is not None");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (image) {
      const file = fileRef.current.files[0];

      const formData = new FormData();
      if (fileRef.current.files.length > 0) {
        console.log("image appended");
        formData.append("image", file, file?.name);
      }
      formData.append("title", title);

      try {
        await axios.post("/banner/", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        const getResponse = await axios.get("/banner");
        setDetails(getResponse.data);
        Swal.fire({
          title: "Success!",
          text: "Banner added successfully.",
          icon: "success",
          backdrop: false // Disable backdrop overlay
        });
        setOpen(false);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          backdrop: false
        });
      }
    } else {
      setError("Please select an image.");
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    axios
      .get("/banner/")
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
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        backdrop: false, // Disable backdrop overlay
        allowOutsideClick: false
      });

      if (result.isConfirmed) {
        Swal.showLoading(); // Show loading spinner
        await axios.delete(`/banner/${id}`);
        const response = await axios.get("/banner");
        setDetails(response.data);
        Swal.fire({
          title: "Success!",
          text: "Banner has been Active/Deactivate.",
          icon: "success",
          backdrop: false // Disable backdrop overlay
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        backdrop: false
      });
    }
  };
  const handlePageChange = (event, newPage) => {
    handleChangePage(event, setPage, newPage);
  };
  const handleRowsPerPageChange = (event) => {
    handleChangeRowsPerPage(event, setPage, setRowsPerPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - details.length) : 0;
  useEffect(() => {
    axios.get("/banner").then((response) => {
      setDetails(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title> Banner </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Banner
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpenModal}
          >
            New Banner
          </Button>
        </Stack>

        <Card sx={{ boxShadow: "13px 8px 7px rgba(0, 0, 0, 0.25)" }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? "right" : "left"}
                      >
                        <TableSortLabel hideSortIcon>
                          {headCell.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details &&
                    details
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const { id, title, created_at, active, image } = row;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            is_student="checkbox"
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                {" "}
                                <Typography variant="subtitle2" noWrap ml={2}>
                                  {title}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              <img
                                src={image}
                                alt={title}
                                width="50%"
                                height="75%"
                              />
                            </TableCell>
                            <TableCell align="left">{created_at}</TableCell>

                            <TableCell align="left">
                              {active ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="right">
                              <MenuItem
                                sx={{ color: "error.main" }}
                                onClick={() => handleDelete(id)}
                              >
                                <Iconify
                                  icon={"eva:trash-2-outline"}
                                  sx={{ mr: 2, mb: 2 }}
                                />
                                Delete
                              </MenuItem>
                              <MenuItem onClick={() => handlePublish(id)}>
                                {active ? (
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
                                {active ? "Deactive" : "Active"}
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

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Banner</DialogTitle>
          <form onSubmit={handleAdd} encType="multipart/form-data">
            <DialogContent>
              <Stack spacing={2}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  name="title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  sx={{ marginBottom: "16px", marginTop: "1rem" }}
                  ref={fileRef}
                />

                {image ? <img src={image}></img> : null}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={image === null}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}
