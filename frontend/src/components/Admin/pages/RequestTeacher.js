import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  TableContainer,
  TablePagination,
  Box,
  CircularProgress
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Label from "../../../Admin/label";
import Scrollbar from "../../../Admin/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import { applySortFilter, getComparator, handleChangePage, handleChangeRowsPerPage, handleClick, handleFilterByName, handleRequestSort, handleSelectAllClick } from "./fuction";
import { baseUrl } from "../../../constants/baseUrl";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "mobile_number", label: "Phone Number", alignRight: false },
  { id: "country", label: "Country", alignRight: false },
  { id: "is_blocked", label: "Status", alignRight: false },
  { id: "" }
  // { id: "" }
];




export default function RequestTeacher() {
  const [details, setDetails] = useState([]);

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
    .get("/request/teacher/")
    .then(response => {
      setDetails(response.data);
      setLoading(false)
      console.log(response.data);
    })
    .catch(error => {console.error(error);
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
        <title> Requested Teacher </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Requested Teacher
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
                        user:{id,name,image,email,country,mobile_number,is_block},
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
                              <Avatar
                                alt="User image"
                                src={
                                  image
                                    ? `${baseUrl}${image}`
                                    : null
                                }
                              />
                              <Typography variant="subtitle2" noWrap ml={2}>
                                <Link to={`/admin/request/teacher/${id}`}>
                                {name}
                                </Link>
            
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {email}
                          </TableCell>
                          <TableCell align="left">
                            {mobile_number}
                          </TableCell>
                          <TableCell align="left">
                            {country}
                          </TableCell>

                          <TableCell align="left">
                            <Label color={is_block ? "error" : "success"}>
                              {is_block ? "Banned" : "Active"}
                            </Label>
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
