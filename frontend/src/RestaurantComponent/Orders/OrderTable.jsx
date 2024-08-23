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

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder , updateOrderStatus } from "../../component/State/Restaurant Order/Action";

const orderStatus = [
  {label:"All" , value:"ALL"},
  {label:"Pending" , value:"PENDING"},
  {label:"On Delivary" , value:"ON DELIVARY"},
  {label:"Completed" , value:"COMPLETED"},
  {label:"Cancelled" , value:"CANCELLED"},
]

export const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder, ingredients, menu } = useSelector(
    (store) => store
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        fetchRestaurantsOrder({
          restaurantId: restaurant.usersRestaurant.id,
          jwt,
        })
      );
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const handleUpdateOrder=(orderId,orderStatus) => {
    dispatch(updateOrderStatus({orderId, orderStatus, jwt}) )
    handleClose();
  }

  return (
    <Box>
      <Card className="mt-2">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {1}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar src={orderItem.food.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">
                    {item.customer?.fullName}
                  </TableCell>
                  <TableCell align="right">Rs.{item.totalAmount}/=</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <div>
                        {orderItem.ingredients.map((ingredient) => (
                          <Chip label={ingredient} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {orderStatus.map((status) => 
                      <MenuItem onClick={()=> handleUpdateOrder(item.id,status.value)}> {status.label}</MenuItem>)
                      }
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
