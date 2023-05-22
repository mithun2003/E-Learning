import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import image from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Reducers/LoginReducer";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import DrawerComp from "./DrawerComp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { baseUrl } from "../../constants/baseUrl";

const pages = ["Courses", "Category", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery (theme.breakpoints.down(1240));
  const logoutHandler = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      console.log("logged out");
      dispatch(logout());
      navigate("/");
    }
  };
  const  user = JSON.parse(localStorage.getItem("user"));

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated } = useSelector((state) => state.login);
  const teacher = JSON.parse(localStorage.getItem("teacher"))
  const handleWishlist = () => {
    navigate('/whishlist')
  };

  console.log({ user });
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleNav = (page) => {
    if (page === "Courses") {
      navigate('/courses');
    } 
    
  };
  const handleItemClick = (setting) => {
    if (setting === "Logout") {
      logoutHandler();
    } else if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "Dashboard") {
      navigate("/");
    }
    
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#C1D3DF",
        color: "#1D5564",
        borderBottom: "1px solid #1D5564",
        boxShadow: "none"
      }}
    >
        <Toolbar disableGutters sx={{marginLeft:'5%',marginRight:'5%'}}>
          {isMobile ?(   
            <>
            <DrawerComp pages={pages}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent:'center'

            }}
            >
              <Link to="/">
            <img
              src={image}
              alt="Logo"
              style={{ width: "4.5vh" }}
              
              />
              </Link>
          </Typography>
          
              </>

          ) : 
          
          (
            <>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}

          >
            <img
              src={image}
              alt="Logo"
              style={{ width: "50px",cursor:'pointer'}}
              onClick={()=>navigate('/')}
              
            />
          </Typography>
          
       
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>handleNav(page)}
                sx={{ my: 2, color: "#1D5564", display: "block",fontFamily: 'Montserrat, sans-serif' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          </>
          )}

   <IconButton onClick={handleWishlist}>
          <FavoriteBorderIcon sx={{marginRight:'1rem'}}/>
   </IconButton>
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name} src={user.image && `${baseUrl}${user.image}`} />
                {/* <Button
                variant="outlined"
                  onClick={handleOpenUserMenu}
                  sx={{ my: 2, color: "#1D5564", display: "block", borderColor: "#1D5564"}}
                >
                  {user.name}
                </Button> */}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      handleItemClick(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Link
              to="/login"
              
              style={{
                my: 2,
                color: "#1D5564",
                display: "block",
                fontSize: "16px", 
                transition: "text-decoration 0.3s",
                textDecoration: "none" ,
                marginLeft:'auto'
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = "underline"; 
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = "none"; 
              }}
            >
              Login
            </Link>
          )}
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
export default ResponsiveAppBar;
