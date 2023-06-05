import { useEffect, useState } from "react";
import axios from "../../../axios";
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  MenuItem,
  TableContainer,
  TablePagination
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Label from "../../../Admin/label";
import Iconify from "../../../Admin/iconify";
import Scrollbar from "../../../Admin/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  applySortFilter,
  getComparator,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClick,
  handleFilterByName,
  handleRequestSort,
  handleSelectAllClick
} from "./fuction";
import { baseUrl } from "../../../constants/baseUrl";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "mobile_number", label: "Phone Number", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "is_verified", label: "Verified", alignRight: false },
  { id: "is_blocked", label: "Status", alignRight: false },
  { id: "" }
  // { id: "" }
];

export default function TeacherPage() {
  const [details, setDetails] = useState([]);
  const { token } = useSelector((state) => state.adminLogin);
  console.log("detail", details);

  const handleBlock = (id) => {
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
      backdrop: false, // Disable backdrop overlay
      allowOutsideClick: false,
      showLoaderOnConfirm: true // Display loading spinner
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading(); // Show loading spinner

        axios
          .post(`/user/block/${id}`, null, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            setDetails((prevDetails) => {
              return prevDetails.map((item) => {
                if (item.user.id === id) {
                  return {
                    ...item,
                    user: {
                      ...item.user,
                      is_block: !item.user.is_block
                    }
                  };
                }
                return item;
              });
            });
            Swal.fire({
              title: "Success!",
              text: "User has been blocked/unblocked.",
              icon: "success",
              backdrop: false // Disable backdrop overlay
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              backdrop: false
            });
          });
      }
    });
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("/teacher/get")
      .then((response) => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
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
        <title> Teacher </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Teacher
          </Typography>
    
        </Stack>

        <Card sx={{ boxShadow: "13px 8px 7px rgba(0, 0, 0, 0.25)" }}>
          <UserListToolbar
            // numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilter}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, overflowX: "hidden" }}>
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
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        user: {
                          id,
                          name,
                          is_teacher,
                          mobile_number,
                          country,
                          is_block,
                          email,
                          image
                        }
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
                      
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt="User image"
                                src={image ? `${baseUrl}${image}` : null}
                              />{" "}
                              <Typography variant="subtitle2" noWrap ml={2}>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{mobile_number}</TableCell>
                          <TableCell align="left">{country}</TableCell>

                          {/* <TableCell align="left">
                            {is_verif ? "Student" : "Teacher"}
                          </TableCell> */}

                          <TableCell align="left">
                            {is_teacher ? "Yes" : "No"}
                          </TableCell>

                          <TableCell align="left">
                            <Label color={is_block ? "error" : "success"}>
                              {is_block ? "Banned" : "Active"}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <MenuItem onClick={() => handleBlock(id)}>
                              {is_block ? (
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
                              {is_block ? "Unblock" : "Block"}
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
      </Container>
    </div>
  );
}
