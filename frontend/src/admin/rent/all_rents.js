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
import { Typography } from '@mui/material';



export default function AllCars() {
  //get all rents from database
    const [rents, setRents] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/api/rent/getAllRents')
            .then(res => res.json())
            .then(data => setRents(data));
    }, []);



    return(
      <>
   <Navbar_admin/>

<Typography sx={{marginTop:'80px',
marginLeft:'20px',
fontSize:'30px'}}>All Rents</Typography>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell >Id_Rent</TableCell>
                <TableCell >Matricula</TableCell>
                <TableCell >Marca</TableCell>
                <TableCell >Nome de Utilizador</TableCell>
                <TableCell >Data de Inicio</TableCell>
                <TableCell >Data de fim</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rents.map((rent) => (
              <TableRow
                key={rent.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {rent.id}
                </TableCell>
                <TableCell >{rent.car.matricula}</TableCell>
                <TableCell >{rent.car.marca}</TableCell>
                <TableCell >{rent.user.username}</TableCell>
                <TableCell >{rent.startDate}</TableCell>
                <TableCell >{rent.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )

}
