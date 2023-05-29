import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import axios from "../../axios";

const DrawerComp = ({ pages }) => {
  const [open, setOpen] = useState(false);
  const [anchorElCat, setAnchorElCat] = useState(null);
  const [cat, setCat] = useState(null);

  useEffect(() => {
    axios
      .get("/course/category-list")
      .then((response) => {
        setCat(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOpenCategoryMenu = (event) => {
    if (anchorElCat) {
      // Close the category menu if it's already open
      setAnchorElCat(null);
    } else {
      setAnchorElCat(event.currentTarget);
    }
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCat(null);
  };

  const handleNav = (page) => {
    // Handle navigation to other pages
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "50vw",
            bgcolor: "#C1D3DF"
          }
        }}
      >
        <List sx={{ width: "100%" }}>
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              {page === "Category" ? (
                <>
                  <ListItemButton
                    sx={{ width: "100%" }}
                    onClick={handleOpenCategoryMenu}
                  >
                    <ListItemIcon>
                      <ListItemText
                        sx={{
                          color: "#212B36",
                          fontFamily: "Montserrat, sans-serif"
                        }}
                      >
                        {page}
                      </ListItemText>
                      <ArrowDropDownIcon />
                    </ListItemIcon>
                  </ListItemButton>
                  {anchorElCat && (
                    <List style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                      {cat &&
                        cat.map((category) => (
                          <ListItemButton
                            key={category.id}
                            onClick={handleCloseCategoryMenu}

                          >
                            <Link
                              to={`/category-wise/${category.id}`}
                              style={{ textDecoration: "none",color:'#212B36' }}
                            >
                              {category.name}
                            </Link>
                          </ListItemButton>
                        ))}
                    </List>
                  )}
                </>
              ) : (
                <ListItemButton
                  key={index}
                  sx={{ width: "100%" }}
                  onClick={() => handleNav(page)}
                >
                  <ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#212B36",
                        fontFamily: "Montserrat, sans-serif"
                      }}
                    >
                      {page}
                    </ListItemText>
                  </ListItemIcon>
                </ListItemButton>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
