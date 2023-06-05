import React, { useEffect, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Reducers/LoginReducer";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import DrawerComp from "./DrawerComp";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { baseUrl } from "../../constants/baseUrl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "../../axios";
const pages = ["Courses", "Category", "About"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation(); // Add this line to use the location

  const isMobile = useMediaQuery(theme.breakpoints.down(1240));
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [cat, setCat] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElCat, setAnchorElCat] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.login);
  const teacher = JSON.parse(localStorage.getItem("teacher"));
  const handleWishlist = () => {
    navigate("/whishlist");
  };
  useEffect(() => {
    axios
      .get("/course/category-list")
      .then((response) => {
        setCat(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log({ user });

  const handleOpenCategoryMenu = (event) => {
    setAnchorElCat(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCat(null);
  };
  const handleNav = (page) => {
    if (page === "Courses") {
      navigate("/courses");
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
      <Toolbar disableGutters sx={{ marginLeft: "5%", marginRight: "5%" }}>
        {isMobile ? (
          <>
            <DrawerComp pages={pages} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center"
              }}
            >
              <Link to="/">
                <img src={image} alt="Logo" style={{ width: "4.5vh" }} />
              </Link>
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              <img
                src={image}
                alt="Logo"
                style={{ width: "50px", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <React.Fragment key={page}>
                  {page === "Category" ? (
                    <>
                      <Button
                        onClick={handleOpenCategoryMenu}
                        sx={{
                          my: 2,
                          color: "#1D5564",
                          "& .MuiButton-endIcon": {
                            marginLeft: 0,
                            marginRight: 0
                          },
                          fontFamily: "Montserrat, sans-serif"
                        }}
                        endIcon={<ArrowDropDownIcon />}
                      >
                        {page}
                      </Button>
                      <Menu
                        anchorEl={anchorElCat}
                        open={Boolean(anchorElCat)}
                        onClose={handleCloseCategoryMenu}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left"
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left"
                        }}
                      >
                        {cat &&
                          cat.map((category) => (
                            <MenuItem
                              key={category.id}
                              onClick={handleCloseCategoryMenu}
                            >
                              <Link
                                to={`/category-wise/${category.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#1d5564"
                                }}
                              >
                                {category.name}
                              </Link>
                            </MenuItem>
                          ))}
                      </Menu>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleNav(page)}
                      sx={{
                        my: 2,
                        color: "#1D5564",
                        display: "block",
                        textDecoration:
                          location.pathname === "/courses" && page === "Courses"
                            ? "underline"
                            : "none",

                        fontFamily: "Montserrat, sans-serif"
                      }}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </>
        )}

        <IconButton onClick={handleWishlist}>
          <FavoriteBorderIcon sx={{ marginRight: "1rem" }} />
        </IconButton>
        {isAuthenticated ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={() => navigate("/profile")} sx={{ p: 0 }}>
                <Avatar
                  alt={user.name}
                  src={user.image && `${baseUrl}${user.image}`}
                />
              
              </IconButton>
            </Tooltip>
         
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
              textDecoration: "none",
              marginLeft: "auto"
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
    </AppBar>
  );
}
export default ResponsiveAppBar;
