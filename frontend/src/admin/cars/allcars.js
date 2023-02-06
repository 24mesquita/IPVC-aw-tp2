import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar_admin from '../navbar';



export default function AllCars() {
  //get all cars from database
  const [cars, setCars] = React.useState([]);
  React.useEffect(() => {
      fetch('http://localhost:4000/api/cars/getAllCars')
          .then(res => res.json())
          .then(data => setCars(data));
  }, []);


    return(
      <>
   
      <Navbar_admin />

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Id_Car</TableCell>
              <TableCell >Matricula</TableCell>
              <TableCell >Marca</TableCell>
              <TableCell >Modelo</TableCell>
              <TableCell >Ano</TableCell>
              <TableCell >Cor</TableCell>
              <TableCell >Preço</TableCell>
              <TableCell >Sobre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow
                key={car.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {car.id}
                </TableCell>
                <TableCell >{car.matricula}</TableCell>
                <TableCell >{car.marca}</TableCell>
                <TableCell >{car.modelo}</TableCell>
                <TableCell >{car.ano}</TableCell>
                <TableCell >{car.cor}</TableCell>
                <TableCell >{car.preco}</TableCell>
                <TableCell sx={{width:'10%'}}>{car.sobre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )

}
