import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";





const drawerWidth = 240;





export default function Navbar(props) {
  
  const token = localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  //if the user is admin set the isAdmin value to true

const see_all_cars = () => {
    navigate("/admin/Admin_all_cars");
};
const see_all_users = () => {
  navigate("/admin/Admin_all_users");
};
const add_user = () => {
  navigate("/admin/Admin_create_user");
};
const del_user = () => {
  navigate("/admin/Admin_delete_user");
};
const add_car = () => {
  navigate("/admin/Admin_create_car");
};
const back = () => {
  navigate("/home");
};
const all_rents = () => {
  navigate("/admin/Admin_all_rents");
};

  //get the isAdmin value from the token

  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Car Rental
      </Typography>
      <Divider />
      <List>
      <button>dasd</button>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Admin Dashboard
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="filled" {...bindTrigger(popupState)}>
            Cars
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={see_all_cars}>See all cars</MenuItem>
            <MenuItem onClick={add_car}>Add cars</MenuItem>
            <MenuItem onClick={see_all_users}>Delete cars</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="filled" {...bindTrigger(popupState)}>
            Users
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={see_all_users}>See all users</MenuItem>
            <MenuItem onClick={add_user}>Add users</MenuItem>
            <MenuItem onClick={del_user}>Delete users</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="filled" {...bindTrigger(popupState)}>
            Rents
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={all_rents}>See rents</MenuItem>
     
          </Menu>
        </React.Fragment>
      )}
    </PopupState>

    <Button onClick={back}variant="filled" >Back to Home page</Button>
       

          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            border: '1px solid #000',
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          
          {drawer}
          <button>dasd</button>
        </Drawer>
      </Box>
    </Box>
  );
}
