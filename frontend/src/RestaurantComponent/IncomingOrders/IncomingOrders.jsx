import { Box, Card, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../assets/images/Background_image.png';

// Dummy data for demonstration purposes
const initialOrders = [
  { id: 1, customer: "John Doe", date: "2024-07-10" },
  { id: 2, customer: "Jane Smith", date: "2024-07-11" },
  { id: 3, customer: "Bob Johnson", date: "2024-07-12" } 
];

export const IncomingOrders = () => {
  const [orders] = useState(initialOrders);

  return (
    <>
      <div className='px-2 mt-60px'>
        <Typography sx={{ paddingBottom: "1rem", color: "white", paddingTop:'20px', paddingLeft:'20px' }} variant='h5'>
          Incoming Orders
        </Typography>
      </div>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 2,
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Card 
          sx={{ 
            backdropFilter: 'blur(10px)', // Optional: adds a blur effect to the background
            alignContent: 'left'
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <button className="table-button">Order Id</button>
                  </TableCell>
                  <TableCell align="center">
                    <button className="table-button">Customer</button>
                  </TableCell>
                  <TableCell align="center">
                    <button className="table-button">Date</button>
                  </TableCell>
                  <TableCell align="center">
                    <button className="table-button">View</button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell align="center">{order.id}</TableCell>
                    <TableCell align="center">{order.customer}</TableCell>
                    <TableCell align="center">{order.date}</TableCell>
                    <TableCell align="center">
                      <Link to={`../incoming-order/${order.id}`}>
                        <button className="table-view-button">View</button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
};
