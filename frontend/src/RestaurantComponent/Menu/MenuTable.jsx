// import { Box, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Table.css';

// // Dummy data for demonstration purposes
// const initialOrders = [
//   { id: 1, customer: "John Doe", totalPrice: "LKR 250.00", date: "2024-07-10", status: "Pending" },
//   { id: 2, customer: "Jane Smith", totalPrice: "LKR 500.00", date: "2024-07-11", status: "Pending" },
//   { id: 3, customer: "Bob Johnson", totalPrice: "LKR 750.00", date: "2024-07-12", status: "Cancelled" },
//   { id: 4, customer: "Alice Brown", totalPrice: "LKR 1000.00", date: "2024-07-13", status: "Completed" },
//   { id: 5, customer: "Chris Davis", totalPrice: "LKR 15000.00", date: "2024-07-14", status: "Pending" },
//   { id: 6, customer: "Patricia Miller", totalPrice: "LKR 200.00", date: "2024-07-15", status: "On Delivery" },
//   { id: 7, customer: "Patricia Miller", totalPrice: "LKR 5000.00", date: "2024-07-15", status: "On Delivery" },
//   { id: 8, customer: "Patricia Miller", totalPrice: "LKR 5000.00", date: "2024-07-15", status: "Completed" }
// ];

// export const OrderTable = ({ filterValue }) => {
//   const [orders, setOrders] = useState(initialOrders);

//   const filteredOrders = orders.filter(order => 
//     filterValue === "ALL" || order.status.toLowerCase() === filterValue.toLowerCase()
//   );

//   return (
//     <Box>
//       <Card className='mt-1'>
//         <CardHeader
//           title={"All Orders"}
//           sx={{ pt: 2, alignItems: "center" }}
//         />
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">
//                   <button className="table-button">Order Id</button>
//                 </TableCell> 
//                 <TableCell align="center">
//                   <button className="table-button">Customer</button>
//                 </TableCell>
//                 <TableCell align="center">
//                   <button className="table-button">Total Price</button>
//                 </TableCell>
//                 <TableCell align="center">
//                   <button className="table-button">Date</button>
//                 </TableCell>
//                 <TableCell align="center">
//                   <button className="table-button">Status</button>
//                 </TableCell>
//                 <TableCell align="center">
//                   <button className="table-button">View</button>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredOrders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell align="center">{order.id}</TableCell>
//                   <TableCell align="center">{order.customer}</TableCell>
//                   <TableCell align="center">{order.totalPrice}</TableCell>
//                   <TableCell align="center">{order.date}</TableCell>
//                   <TableCell align="center">{order.status}</TableCell>
//                   <TableCell align="center">
//                     <Link to={`../order/${order.id}`}>
//                       <button className="table-view-button">View</button>
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Card>
//     </Box>
//   );
// }

import { Delete, MoreVert } from '@mui/icons-material'
import { Box, Card, CardActions, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create'
import { useNavigate } from 'react-router-dom'

const orders = [1,1,1,1,1,1,1]

export const MenuTable = () => {

  const navigate = useNavigate();

  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action = {
          <IconButton onClick={()=>navigate("/admin/restaurant/add-menu")} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        }
        title={"Food Items"}
        sx={{pt:2, alignItems:"center"}}
        />

        <CardActions 
        />

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell>id</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Ingredients</TableCell> 
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Availability</TableCell>
            <TableCell align="right">Delete</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{"image"}</TableCell>
              <TableCell align="right">{"codewithzosh"}</TableCell>
              <TableCell align="right">{"price"}</TableCell>
              <TableCell align="right">{"name"}</TableCell>
              <TableCell align="right"><IconButton><Delete/></IconButton></TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>
    </Box>
  )
}

