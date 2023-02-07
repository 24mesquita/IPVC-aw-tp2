import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/navbar';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import TextField from '@mui/material/TextField';
import { Modal } from '@mui/material';
//import defaultcar_img from '../../uploads';





export default function Homepage() {
  const [info, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {//verify if user is logged in
    const hasToken = localStorage.getItem("token");//get token from local storage
    if (hasToken) {
      const info = jwtDecode(hasToken);
      setUserInfo(info);
      console.log(info.id);
    } else {
      navigate("/");
    }
  }, []);

    //display the cars from getallcars controller
    const [cars, setCars] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/api/cars/getAllCars')
            .then(res => res.json())
            .then(data => setCars(data));

    }, []);

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


  const [currentCarId, setCurrentCarId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (id) => {
    setCurrentCarId(id);
    setOpen(true);
  };

  const [DataInicio, setDataInicio] = useState("");
  const [DataFim, setDataFim] = useState("");


//send data to rent controller
  const handleRent = () => {
    const data = {
      id_car: currentCarId,
      id_user: info.id,
      startDate: DataInicio,
      endDate: DataFim,
    };
    console.log(data);
    fetch("http://localhost:4000/api/rent/createRent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })

      .then((res) => res.json())
  };


  const [selectedAno, setSelectedAno] = React.useState('');
  const [selectedMarca, setSelectedMarca] = React.useState('');
  const [selectedTipo, setSelectedTipo] = React.useState('');

  const handleChange = () => {
    fetch(`http://localhost:4000/api/cars/getAllcars/filter?ano=${selectedAno}&marca=${selectedMarca}&tipo=${selectedTipo}`)
      .then(res => res.json())
      .then(data => setCars(data));
  }

  return (
    <>
    <Navbar />
   <div style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign:'center', marginTop:'55px' }}>
      
      <form style={{ width: '100%' }} noValidate autoComplete="off">
      <FormControl style={{ margin: '16px', minWidth: '120px' }}>
       
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
        <FormControl style={{ margin: '16px', minWidth: '120px' }}>
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
        <FormControl style={{ margin: '16px', minWidth: '120px' }}>
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
    <MenuItem value={typeCar.description} key={index}>
      <em>{typeCar.description}</em>
    </MenuItem>
    ))}
  </Select>
</FormControl>
        <Button onClick={handleChange} variant="contained" color="primary"  style={{ margin: '16px' }}>
          Filter
        </Button>
      </form>
    </div>

    
    <Container>



    <Grid container spacing={5}>
    {cars.map((car, index) => (
        <Grid key={car.id} item xs={4}  >
      
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            //get image from database from uploads folder
           // src={require(../../uploads/{car.imagem})}
            src={require('../../uploads/'+ car.imagem)}

          />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {car.marca}
              
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {car.modelo} {car.ano}
            </Typography>
            <Typography  variant="h7" component="div">
              {car.matricula}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {car.sobre}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {car.preco} €/day
            </Typography>

          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleOpen(car.id)}>Rent</Button>
          </CardActions>
        </Card>
       {/* <img src={require('../../uploads/' + car.imagem)}> </img> */}

    </Grid>


        ))}

    </Grid>   
        




    </Container>

<Modal
  open={open}
  onClose={handleClose}
>
  <div style={{ backgroundColor: 'white', padding: '32px', margin:'20px', display:'flex' }}>
    <TextField
        id="date"
        label="Data Inicio"
        type="date"
        format="yyyy/MM/dd"
        defaultValue="2023-01-01"
        sx={{ width: 220, marginRight: '16px' }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setDataInicio(e.target.value)}
      />
      <TextField
      format="yyyy/MM/dd"
        id="date"
        label="Data Fim"
        type="date"
        defaultValue="2023-01-01"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setDataFim(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleRent} sx={{marginLeft: '5%'}} >Alugar</Button>
  </div>
</Modal>
    </>
  );
}
