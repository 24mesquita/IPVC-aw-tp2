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
import { useEffect } from 'react';
import preventDefault from '@mui/material/';  






export default function Create_car() {

    const [matricula, setMatricula] = useState("");
    const [selectedMarca, setSelectedMarca] = useState("");
    const [selectedTipo, setSelectedTipo] = useState("");
    const [selectedAno, setSelectedAno] = useState("");
    const [modelo, setModelo] = useState("");
    const [cor, setCor] = useState("");
    const [sobre, setSobre] = useState("");
    const [preco, setPreco] = useState("");
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


//create car
    const handleSubmit = async (e) => {
        e.preventDefault();
        const car = {
            matricula: matricula,
            marca: selectedMarca,
            tipo: selectedTipo,
            ano: selectedAno,
            modelo: modelo,
            cor: cor,
            sobre: sobre,
            preco: preco,
        };
        console.log(car);
        axios.post('http://localhost:4000/api/cars/createCar', car)
            .then((res) => {

                console.log(res.data);
                navigate("/admin/Admin_create_car");
                alert("Car created successfully");
                console.log(car);
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
                alert("Error creating car");
                console.log(car);
            });
    };




            //display the brands from getallbrands controller
    const [brands, setBrands] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/api/brands/getAllBrands')
            .then(res => res.json())
            .then(data => setBrands(data));
    }, []);

const [typeCars, setTypeCars] = React.useState([]);
React.useEffect(() => {
  fetch('http://localhost:4000/api/typeCar/getAllTypeCars')
    .then(res => res.json())
    .then(data => setTypeCars(data)); 
}, []);

const [numbers, setNumbers] = useState([]);

useEffect(() => {
  const arr = [];
  for (let i = 1980; i <= 2023; i++) {
    arr.push(i);
  }
  setNumbers(arr);
}, []);




  return (
    <>
    <Navbar_admin/>
<Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
      sx={{
        width: 500,
        textAlign: 'center',
        boxShadow: 1,
        padding: 2,
      }}
    >
    <Typography variant="h4" component="div" gutterBottom>
        Create Car
    </Typography>
    <TextField onChange={(e) => setMatricula(e.target.value)} name='matricula' id="standard-basic" label="Matricula" variant="standard" sx={{
        position: 'relative',
        width: '80%',
        margin: '5%',
    }}/>

<FormControl style={{ margin:'7px',minWidth: '120px' }}>
       
       <InputLabel id="label">Ano</InputLabel>
       <Select
       value={selectedAno}
       onChange={e => setSelectedAno(e.target.value)}
         labelId="label"
         id="label-select"
name='ano'
         style={{ width: '100%' }}
       >
  {numbers.map((number) => (
         <MenuItem key={number} value={number} >
           <em>{number}</em>
         </MenuItem>
  ))}
       </Select>
     </FormControl>
     <FormControl style={{ margin:'7px', minWidth: '120px' }}>
       <InputLabel id="label">Marca</InputLabel>
       <Select
       value={selectedMarca}
       onChange={e => setSelectedMarca(e.target.value)}
       labelId="label"
       id="label-select"
       name='marca'

         style={{ width: '100%' }}
       >
         {brands.map((brand, index) => (
         <MenuItem value={brand.nome_marca} key={index}>
           <em>{brand.nome_marca} </em>
         </MenuItem>
         ))}
       </Select>
     </FormControl>
     <FormControl style={{ margin: '7px', minWidth: '120px' }}>
<InputLabel id="label">Tipo do carro</InputLabel>
<Select
name='tipo'
 labelId="label"
 id="label-select"
 style={{ width: '100%' }}

 value={selectedTipo}
 onChange={e => setSelectedTipo(e.target.value)}
>
 {typeCars.map((typeCar, index) => (
 <MenuItem value={typeCar.id} key={index}>
   <em>{typeCar.description}</em>
 </MenuItem>
 ))}
</Select>
</FormControl>

<TextField onChange={(e) => setModelo(e.target.value)}id="standard-basic" name="modelo" label="Modelo" variant="standard" sx={{
        position: 'relative',
        width: '150px',
        margin: '5%',
        color: '#000',
    }}/>

<TextField onChange={(e) => setCor(e.target.value)}id="standard-basic" name="cor" label="Cor" variant="standard" sx={{
        position: 'relative',
        width: '150px',
        margin: '5%',
        color: '#000',
    }}/>

<TextField onChange={(e) => setPreco(e.target.value)}id="standard-basic" name="preco" label="Preço" variant="standard" sx={{
        position: 'relative',
        width: '150px',
        margin: '5%',
        color: '#000',
    }}/>

<TextField onChange={(e) => setSobre(e.target.value)}id="standard-basic" name="sobre" label="Sobre o Carro" variant="standard" sx={{
        position: 'relative',
        width: '150px',
        margin: '5%',
        color: '#000',
    }}/>





<Button sx={{
    position:'relative',
    marginTop: '20%',
    width: '80%',
    backgroundColor: '#000',
}}

variant="contained" onClick={{handleSubmit}}>
    Create Car</Button>

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