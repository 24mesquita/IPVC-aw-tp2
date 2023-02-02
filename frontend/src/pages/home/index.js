import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/navbar/index.js';
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';


import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


export default function ImgMediaCard() {


    const [year, setYear] = React.useState('');
    const [label, setLabel] = React.useState('');
    const [model, setModel] = React.useState('');
  
    const handleYearChange = (event) => {
      setYear(event.target.value);
    };
  
    const handleLabelChange = (event) => {
      setLabel(event.target.value);
    };
  
    const handleModelChange = (event) => {
      setModel(event.target.value);
    };
  
    const handleFilterSubmit = () => {
      // submit the filter to the backend and update the car list
    };

    //display the cars from getallcars controller
    const [cars, setCars] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/api/cars/getAllCars')
            .then(res => res.json())
            .then(data => setCars(data));
    }, []);

   


    
  return (
    <>
   
    <Navbar />
   <div style={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign:'center', marginTop:'55px' }}>
      <form style={{ width: '100%' }} noValidate autoComplete="off">
        <TextField
          id="year"
          label="Year"
          value={year}
          onChange={handleYearChange}
          style={{ margin: '16px' }}
        />
        <FormControl style={{ margin: '16px', minWidth: '120px' }}>
          <InputLabel id="label">Label</InputLabel>
          <Select
            labelId="label"
            id="label-select"
            value={label}
            onChange={handleLabelChange}
            style={{ width: '100%' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="bmw">BMW</MenuItem>
            <MenuItem value="audi">Audi</MenuItem>
            <MenuItem value="mercedes">Mercedes</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="model"
          label="Model"
          value={model}
          onChange={handleModelChange}
          style={{ margin: '16px' }}
        />
        <Button variant="contained" color="primary" onClick={handleFilterSubmit} style={{ margin: '16px' }}>
          Filter
        </Button>
      </form>
    </div>

    
    <Container>

    <Grid container spacing={5}>
    {cars.map((car, index) => (
        <Grid item xs={6}>
      
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={car.image}
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
            <Button size="small">Rent</Button>
            <Button size="small">See More</Button>
          </CardActions>
        </Card>
      
        </Grid>
        ))}
    </Grid>   
    </Container>
    </>
  );
}
