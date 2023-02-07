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
import Navbar_admin from '../navbar';


export default function Login() {
    const [id, setIdUser] = useState("");

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

//delete car, with validation of the id and confirm the delete

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:4000/api/cars/deleteCar/${id}`)
        .then((res) => {
            navigate("/admin/Admin_delete_car");
            alert("Car deleted");
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
        Delete Car
    </Typography>
    <TextField onChange={(e) => setIdUser(e.target.value)} name='Id' id="standard-basic" label="Id do Utilizador" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
    }}/>





<Button sx={{
    position:'relative',
    marginTop: '20%',
    width: '80%',
    backgroundColor: '#000',
}}
onClick={handleSubmit}
variant="contained">
    Delete Car</Button>

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