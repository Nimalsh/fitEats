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

import CreateIcon from '@mui/icons-material/Create'
import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React , { useEffect } from 'react'
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant , updateStockOfIngredient } from '../../component/State/ingredients/Action'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Tables = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant , ingredients } = useSelector(store=>store)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect (() => {
    if (restaurant.usersRestaurant) {
      dispatch(getIngredientsOfRestaurant({ 
        jwt,
        id: restaurant.usersRestaurant.id,
      })); 
 
    }
  }, [dispatch, jwt, restaurant.usersRestaurant]);

  const handleUpdateStoke = (id) => {
    dispatch(updateStockOfIngredient({ id , jwt }))
  } 

  return (
    <Box>
      <Card className='mt-2'>
        <CardHeader
        action = {
          <IconButton onClick={handleOpen} aria-label='settings'>
            <CreateIcon />
          </IconButton>
        }
        title={"Ingredients"}
        sx={{pt:2, alignItems:"center"}}
        />

        <CardActions 
        />

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell align="left">id</TableCell> 
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>  
            <TableCell align="right">Availability</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.ingredients.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{item.name}</TableCell> 
              <TableCell align="right">{item.category.name}</TableCell>
              <TableCell align="center">
                <button className="button details-button" onClick={()=>handleUpdateStoke(item.id)}>
                  {item.in_stoke? "in_stock":"out-stock"}
                  </button>
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}> 
          <CreateIngredientForm/>
        </Box>
      </Modal>
    </Box>
  )
}

