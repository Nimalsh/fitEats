import { Avatar, Card, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventAction, getRestaurantsEvents } from '../../component/State/Restaurant/Action';

const initialState = {
  restaurantsEvents: [], 
};

export const EventTable = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")

    const { restaurant, event } = useSelector((store) => store);

    useEffect(() => {
        console.log('Fetching restaurant events'); // Debugging log
        if (restaurant.usersRestaurant) {
            dispatch(getRestaurantsEvents({
                restaurantId: restaurant.usersRestaurant.id,
                jwt
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant]);

    useEffect(() => {
        console.log('restaurant.usersRestaurant:', restaurant.usersRestaurant); // Debugging log
        console.log('event.restaurantsEvents:', event.restaurantsEvents); // Debugging log
    }, [restaurant.usersRestaurant, event.restaurantsEvents]);

    const handleDeleteEvent = (eventId) => {
        dispatch(deleteEventAction({ eventId, jwt }));
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
            <TableCell align="right">Starts At</TableCell> 
            <TableCell align="right">Ends At</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Delete</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
    {event.restaurantsEvents && event.restaurantsEvents.length > 0 ? (
        event.restaurantsEvents.map((item) => (
            <TableRow key={item.id}>
                <TableCell component="th" scope="row">{item.id}</TableCell>
                <TableCell><Avatar src={item.images} /></TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{new Date(item.startedAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">{new Date(item.endAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">{item.location}</TableCell>
                <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDeleteEvent(item.id)}>
                        <button className='btn delete-button'>Delete</button>
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
    ) : (
        <TableRow>
            <TableCell colSpan={7} align="center">No Events Found</TableCell>
        </TableRow>
    )}
</TableBody>

      </Table>
    </TableContainer>
        
        </Card>

     </Box>
   )
 }
 