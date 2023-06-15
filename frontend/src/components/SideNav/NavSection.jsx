import PropTypes from "prop-types";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "../../Admin/nav-section/styles";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../../Reducers/LoginReducer";
import { useEffect, useState } from "react";
import Room from "../Live/Room";
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
  const navigate = useNavigate()
  const { title, path, icon, info } = item;
  const dispatch = useDispatch();
  const teacher = JSON.parse(localStorage.getItem("teacher"))

  const [open,setOpen]= useState(false)

  const handleOpen = () => {
    setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
  };
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit random number
    return randomNumber.toString(); // Convert the random number to a string
  };
  const openNewWindow = (url) => {
    window.open(url, "_blank","width=1000,height=500"); // Open the URL in a new window
  };
 
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
        navigate("/");
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
    if (title==="Go Live"){
      // const randomPath = '/live/' + generateRandomNumber();
      // openNewWindow(randomPath);
      handleOpen();
    }
  };
  return (
    <>
    <StyledNavItem
  component={RouterLink}
  to={path}
  sx={
    title !== 'logout' && title !=="Go Live"
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
    <Room isOpen={open} isClose={handleClose} />

      {/* <Button>Logout</Button> */}
      </>
  );
}
