import * as React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";



export default function Register() {

//send data to backend
const [nomeDeUtilizador, setNomeDeUtilizador] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
        username: nomeDeUtilizador,
        password: password,
        email: email,
    };
    try {
        const res = await axios.post("http://localhost:4243/api/users/createUser", newUser);
        navigate("/");

    } catch (err) {
        console.log(err);
    }
};



  return (
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
        Register
    </Typography>
    <TextField onChange={(e) => setNomeDeUtilizador(e.target.value)}
                  name="username" id="standard-basic" label="Nome de Utilizador" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
    }}/>

<TextField onChange={(e) => setEmail(e.target.value)}
                  name="email" id="standard-basic" label="Email" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
    }}/>

<TextField onChange={(e) => setPassword(e.target.value)}
                  name="password" type="password" id="standard-basic" label="Password" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
        color: '#000',
    }}/>
    <TextField id="standard-basic" name='repeatPassword' label="Confirme Password" variant="standard" sx={{
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
    Register</Button>


    <Typography sx={{
        marginTop: '10%',
    }} variant="h7" component="div" gutterBottom>
        Already have an account?
        <Button sx={{
            fontSize: '10px',
        }}>Click Here</Button>
    </Typography>
</Box>


</Container>


  
  );
}