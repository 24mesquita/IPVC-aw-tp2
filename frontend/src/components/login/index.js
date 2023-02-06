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

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [openToast1, setOpenToast1] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleRegister = () => {
        navigate("/register");
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        } else {
            setOpenToast1(false);
        }
    };
    //send data to backend to login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = {
            username: username,
            password: password,
        };
        
        await axios.post("http://localhost:4000/api/users/loginUser", login).then((res) => {
            localStorage.setItem("token", res.data.token);
            navigate("/home");
     
        })
        .catch((err) => {
            if (err.response.status === 400) {
                setErrorMessage(err.response.data);
                setOpenToast1(true);
            }
        });
    };

  return (
    <>
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
        Login
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

<Button sx={{
    position:'relative',
    marginTop: '20%',
    width: '80%',
    backgroundColor: '#000',
}}
onClick={handleSubmit}
variant="contained">
    Login</Button>
    <Typography sx={{
        marginTop: '10%',
    }} variant="h7" component="div" gutterBottom>
        Dont have an accoent?
        <Button sx={{
            fontSize: '10px',
        }}
        onClick={handleRegister}
        >Click Here</Button>
    </Typography>
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