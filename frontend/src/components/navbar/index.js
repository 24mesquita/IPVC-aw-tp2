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
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';





export default function Navbar(props) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = () => {
    const hasToken = localStorage.getItem("token");//get token from local storage
    if (hasToken) {
        const info = jwt_decode(hasToken);
        if (info.isAdmin == true) {
          setIsAdmin(true);
        }else{
          setIsAdmin(false);
        }
    } else {
        navigate("/");
  }}
  



useEffect(() => {
  checkAdmin();
}, []);


  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  const go_admin = () => {
    navigate("/admin/Admin_all_cars");
  };
  const cars_rented = () => {
    navigate("/user_rent");
  };
  const go_home = () => {
    navigate("/home");
  };

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
            Car Rental
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {isAdmin ? (
              <button onClick={go_admin}>Admin Button</button>
           ) : null}
     
              <Button  sx={{ color: '#fff',
           border:'1px solid #fff', margin:'10px' }}
           onClick={go_home}>
                Home
              </Button>
              <Button  sx={{ color: '#fff',
           border:'1px solid #fff', margin:'10px' }}
           onClick={cars_rented}>
                Cars Rented
              </Button>
      
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
