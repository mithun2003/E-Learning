import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "../../Admin/nav-section/styles";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../Reducers/LoginReducer";
import { useEffect } from "react";
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map(item => <NavItem key={item.title} item={item} />)}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;
  const dispatch = useDispatch();
  const teacher = JSON.parse(localStorage.getItem("teacher"))

 
  // const {success} = useSelector((state)=>state.adminLogin)
  const logoutHandler = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      backdrop:false,
    }).then(result => {
      if (result.isConfirmed) {
        console.log("logged out");
        dispatch(logout());
        // if(success===false){
          // navigate("/admin/login/");
        // }
      } else {
        console.log("canceled");
      }
    });
  };

  const handleNav = title => {
    if (title === "logout") {
      logoutHandler();
    }
  };
  return (
    <>
    <StyledNavItem
  component={RouterLink}
  to={path}
  sx={
    title !== 'logout'
      ? {
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
        }
      : null
  }
>

      <StyledNavItemIcon>
        {icon && icon}
      </StyledNavItemIcon>

      <ListItemText
        disableTypography
        primary={title}
        onClick={title==='logout'?logoutHandler:() => handleNav(title)}
        sx={title === "logout" ? { color: "red" } : null}
      />
      {info && info}
    </StyledNavItem>
      {/* <Button>Logout</Button> */}
      </>
  );
}
