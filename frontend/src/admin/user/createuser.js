import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState } from "react";
import {
    Snackbar,
    Alert
    } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { Grid } from '@mui/material';
import { MenuItem } from '@mui/material';
import Navbar_admin from '../navbar';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [openToast1, setOpenToast1] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } else {
            setOpenToast1(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
            email: email,
            isAdmin: isAdmin
        };
             await axios.post("http://localhost:4000/api/users/createUser", newUser).then((res) => {
                  navigate("/admin/Admin_create_user");
                  alert("User created successfully");
              })
              .catch((err) => {
                if (err.response.status === 400) {
                  alert("User already exists");
                }else{
                alert("Error creating user");
                }
              });
        };

  return (
    <>
    <Navbar_admin/>
<Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
      sx={{
        width: 300,
        textAlign: 'center',
        boxShadow: 1,
        padding: 2,
      }}
    >
    <Typography variant="h4" component="div" gutterBottom>
        Create User
    </Typography>
    <TextField onChange={(e) => setUsername(e.target.value)} name='username' id="standard-basic" label="Nome de Utilizador" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
    }}/>

<TextField onChange={(e) => setPassword(e.target.value)}id="standard-basic" name="password" label="Password" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
        color: '#000',
    }}/>

<TextField onChange={(e) => setEmail(e.target.value)}id="standard-basic" name="password" label="Email" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
        color: '#000',
    }}/>

<FormControl style={{ margin: '16px', minWidth: '120px' }}>
       
          <InputLabel id="label">Admin</InputLabel>
          <Select
          onChange={(e) => setIsAdmin(e.target.value)}
            labelId="label"
            id="label-select"
   name='admin'
            style={{ width: '100%' }}
          >
 
            <MenuItem  value='0' >
              <em>False</em>
            </MenuItem>
            <MenuItem  value='1' >
              <em>True</em>
            </MenuItem>

          </Select>
        </FormControl>

<Button sx={{
    position:'relative',
    marginTop: '20%',
    width: '80%',
    backgroundColor: '#000',
}}
onClick={handleSubmit()}
variant="contained">
    Create User</Button>

</Box>


</Container>
<Snackbar open={openToast1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
</Snackbar>
</>
  
  );
}