import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Login() {
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
        Login
    </Typography>
    <TextField id="standard-basic" label="Nome de Utilizador" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        marginTop: '10%',
    }}/>

<TextField id="standard-basic" label="Password" variant="standard" sx={{
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
variant="contained">
    Login</Button>
    <Typography sx={{
        marginTop: '10%',
    }} variant="h7" component="div" gutterBottom>
        Dont have an accoent?
        <Button sx={{
            fontSize: '10px',
        }}>Click Here</Button>
    </Typography>
</Box>


</Container>


  
  );
}