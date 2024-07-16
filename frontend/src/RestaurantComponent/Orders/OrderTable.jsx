import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';

// Dummy data for demonstration purposes
const initialOrders = [
  { id: 1, customer: "John Doe", totalPrice: "LKR 250.00", date: "2024-07-10", status: "Completed" },
  { id: 2, customer: "Jane Smith", totalPrice: "LKR 500.00", date: "2024-07-11", status: "Pending" },
  { id: 3, customer: "Bob Johnson", totalPrice: "LKR 750.00", date: "2024-07-12", status: "Cancelled" },
  { id: 4, customer: "Alice Brown", totalPrice: "LKR 1000.00", date: "2024-07-13", status: "Completed" },
  { id: 5, customer: "Chris Davis", totalPrice: "LKR 15000.00", date: "2024-07-14", status: "Pending" },
  { id: 6, customer: "Patricia Miller", totalPrice: "LKR 200.00", date: "2024-07-15", status: "On Delivery" },
  { id: 7, customer: "Patricia Miller", totalPrice: "LKR 5000.00", date: "2024-07-15", status: "On Delivery" }
];

export const OrderTable = ({ filterValue }) => {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filteredOrders = orders.filter(order => 
    filterValue === "ALL" || order.status.toLowerCase() === filterValue.toLowerCase()
  );

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <button className="table-button">Order Id</button>
                </TableCell> 
                <TableCell align="center">
                  <button className="table-button">Customer</button>
                </TableCell>
                <TableCell align="center">
                  <button className="table-button">Total Price</button>
                </TableCell>
                <TableCell align="center">
                  <button className="table-button">Date</button>
                </TableCell>
                <TableCell align="center">
                  <button className="table-button">Status</button>
                </TableCell>
                <TableCell align="center">
                  <button className="table-button">View</button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{order.customer}</TableCell>
                  <TableCell align="center">{order.totalPrice}</TableCell>
                  <TableCell align="center">{order.date}</TableCell>
                  <TableCell align="center">
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      displayEmpty
                      className="button table-status-select"
                      inputProps={{ 'aria-label': 'Without label' }} > 
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                      <MenuItem value="On Delivery">On Delivery</MenuItem>
                    </Select> 
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`../order/${order.id}`}>
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
  );
}
