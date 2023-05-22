import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComp = ({pages}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}   PaperProps={{

sx: {
  width: '50vw',
  bgcolor:'#C1D3DF'
}
}}>
        <List sx={{width:'100%'}}>
          {pages.map((page,index)=>(
          <ListItemButton key={index} sx={{width:'100%'}}>
            <ListItemIcon>
              <ListItemText sx={{color:'#212B36',fontFamily: 'Montserrat, sans-serif'}} onClick={()=>setOpen(!open)}>
                {page}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
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
