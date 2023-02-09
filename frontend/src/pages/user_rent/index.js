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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import TextField from '@mui/material/TextField';
import { Modal } from '@mui/material';





export default function Homepage() {
  const [info, setUserInfo] = useState({});
  const navigate = useNavigate();


//verify if user is logged in
    useEffect(() => {
        const hasToken = localStorage.getItem("token");//get token from local storage
        if (hasToken) {
            const info = jwtDecode(hasToken);
            setUserInfo(info);      
              loadCarRent(info.id);
        } else {
            navigate("/");
        }
    }, []);

    //use controller get getAllRentsUser
    const [rents, setRents] = useState([]);

  
//delete rent
    const deleteRent = async (id) => {
      await fetch(`http://localhost:4000/api/rent/deleteRent/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }

       });



    };


   

    const loadCarRent = async (user_id) => {
      const response = await fetch(`http://localhost:4000/api/rent/getAllRentsUser/${user_id}`);
      const data = await response.json();
      setRents(data);
   
    };

  return (
    <>
    <Navbar />

    <Container sx={{marginTop:'7%'}}>

    <Grid container spacing={5}>
    {rents.map((rent, index) => (
        <Grid item xs={4}>
      
        <Card key={rent.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            src={require('../../uploads/'+ rent.car.imagem)}
            //get image from database from uploads folder
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {rent.car.marca}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {rent.car.matricula}
            </Typography>
            <Typography  variant="h7" component="div">
        
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {rent.startDate} - {rent.endDate  }
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
                   {rent.car.preco}€/day
            </Typography>

          </CardContent>
          <CardActions>
            <Button size="small" onClick={deleteRent(rent.id)} >Delete</Button>
          </CardActions>
        </Card>
    </Grid>


         ))}
    </Grid>   


    </Container>
    </>
  );

}

