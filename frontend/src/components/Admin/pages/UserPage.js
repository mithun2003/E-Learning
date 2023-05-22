import { useEffect, useState } from "react";
import axios from "../../../axios";
import {
  Card,
  Table,
  Stack,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  MenuItem,
  TableContainer,
  TablePagination,
  Avatar,
  Box,
  CircularProgress
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Label from "../../../Admin/label";
import Iconify from "../../../Admin/iconify";
import Scrollbar from "../../../Admin/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { applySortFilter, getComparator, handleChangePage, handleChangeRowsPerPage, handleClick, handleFilterByName, handleRequestSort, handleSelectAllClick } from "./fuction";
import { baseUrl } from "../../../constants/baseUrl";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "is_student", label: "Role", alignRight: false },
  { id: "is_active", label: "Verified", alignRight: false },
  { id: "is_blocked", label: "Status", alignRight: false },
  { id: "" }
  // { id: "" }
];
export default function UserPage() {
  const [details, setDetails] = useState([]);
  const { token } = useSelector(state => state.adminLogin);
  console.log("detail", details);
  const handleDelete = id => {
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

    }).then(result => {
      if (result.isConfirmed) {
        axios
          .post(`/user/delete/${id}`)
          .then(() => {
            const newData = details.filter(user => {
              return user.id !== id;
            });
            setDetails(newData);
            Swal.fire({
              title: 'Deleted!',
              text: 'The user has been deleted.',
              icon: 'success',
              backdrop: false // Disable backdrop overlay
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'Error!',
              text: 'Something went wrong.',
              icon: 'error',
              backdrop: false // Disable backdrop overlay
            });
          });
      }
    });
  };
  const handleBlock = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "Press confirm to block/unblock",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      backdrop: false // Disable backdrop overlay

    }).then(result => {
      if (result.isConfirmed) {
        axios
          .post(`/user/block/${id}`, null, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            setDetails(prevDetails => {
              return prevDetails.map(user => {
                if (user.id === id) {
                  return {
                    ...user,
                    is_block: !user.is_block
                  };
                }
                return user;
              });
            });
            Swal.fire(
              {
                title: 'Success!',
                text: 'User has been blocked/unblocked.',
                icon: 'success',
                backdrop: false // Disable backdrop overlay
              }
            );
          })
          .catch(() => {
            Swal.fire({title:"Error!", text:"Something went wrong.", icon:"error",backdrop: false});
          });
      }
    });
  };


  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true)
    axios
    .get("/get/users/")
    .then(response => {
      setDetails(response.data);
      setLoading(false)
      // console.log(response);
      console.log(response.data);
    })
    .catch(error => { console.error(error);
    setLoading(false)})
  }, []);


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
        <title> User </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button> */}
        </Stack>

        <Card>
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
                  // numSelected={selected.length}
                  onRequestSort={handleSort}
                  // onSelectAllClick={handleSelectAll}
                />
                 {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress color="primary" />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">Loading...</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>):(
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const {
                        id,
                        name,
                        image,
                        is_student,
                        is_block,
                        email,
                        is_active
                      } = row;
                      const selectedUser = selected.indexOf(name) !== -1;

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
                              onChange={event => handleRowClick(event, name)}

                            />
                          </TableCell> */}

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              
                            >
                              <Avatar alt={name} src={`${baseUrl}${image}`} />
                              <Typography variant="subtitle2" noWrap ml={2}>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {email}
                          </TableCell>

                          <TableCell align="left">
                            {is_student ? "Student" : "Teacher"}
                          </TableCell>

                          <TableCell align="left">
                            {is_active ? "Yes" : "No"}
                          </TableCell>

                          <TableCell align="left">
                            <Label color={is_block ? "error" : "success"}>
                              {is_block ? "Banned" : "Active"}
                            </Label>
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
                            <MenuItem onClick={() => handleBlock(id)}>
                              {is_block
                                ? <Iconify
                                    icon={"eva:checkmark-outline"}
                                    sx={{ mr: 2 }}
                                  />
                                : <Iconify
                                    icon={"eva:slash-outline"}
                                    sx={{ mr: 2 }}
                                  />}
                              {is_block ? "Unblock" : "Block"}
                            </MenuItem>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 &&
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>}
                </TableBody>)}

                {isNotFound &&
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
                  </TableBody>}
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
      </Container>
    </div>
  );
}
