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



export default function AllUsers() {
  //get all users from database
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4000/api/users/getAllUsers')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);
  

    return(
      <>
   <Navbar_admin/>

<Typography sx={{marginTop:'80px',
marginLeft:'20px',
fontSize:'30px'}}>All Users</Typography>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell >Id User</TableCell>
              <TableCell >User</TableCell>
              <TableCell >Admin</TableCell>
              <TableCell >Email</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell >{user.username}</TableCell>
                <TableCell >{user.isAdmin}</TableCell>
                <TableCell >{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    )

}
