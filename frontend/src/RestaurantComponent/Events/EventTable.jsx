import { Avatar, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventAction, getRestaurantsEvents } from '../../component/State/Restaurant/Action';
 
 export const EventTable = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")

    const { restaurant , event } = useSelector((store) => store)

    // const navigate = useNavigate();

    useEffect(() => {
        if(restaurant.usersRestaurant) {
            dispatch(getRestaurantsEvents({
                restaurantId: restaurant.usersRestaurant.id,
                jwt
            }))
        };
    },[dispatch , jwt , restaurant.usersRestaurant]);

    const handleDeleteEvent = (eventId) => {
        dispatch(deleteEventAction({eventId,jwt}))
    }


   return (
     <Box>
        
        <Card className='mt-2'>

        <CardHeader
            title={"Events and offers"}
            sx={{pt:2, alignitems:"center"}}
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
          {event.restaurantsEvents.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell component="th" scope="row">
              <Avatar src={item.images}></Avatar>
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>  
              <TableCell align="right">
                <IconButton color="error" onClick={()=> handleDeleteEvent(item.id)}>
                
                </IconButton>
                </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
        </Card>

     </Box>
   )
 }
 