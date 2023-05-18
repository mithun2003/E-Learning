import { filter } from "lodash";

export const handleRequestSort = (event, property, order,orderBy, setOrder, setOrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  
  export const handleSelectAllClick = (event, setSelected, selected, details) => {
    if (event.target.checked) {
      const newSelecteds = details.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  export const handleClick = (event, name, setSelected, selected) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  
  export const handleChangePage = (event, setPage, newPage) => {
    setPage(newPage);
  };
  
  export const handleChangeRowsPerPage = (event, setPage, setRowsPerPage) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  
  export const handleFilterByName = (event, setPage, setFilterName) => {
    setPage(0);
    setFilterName(event.target.value);
    console.log(event.target);
  };
  


  export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  export function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  export function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      console.log(array);
      console.log(query);
      return filter(
        array,
        // (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 || _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1

      );
    }
    return stabilizedThis.map((el) => el[0]);
  }