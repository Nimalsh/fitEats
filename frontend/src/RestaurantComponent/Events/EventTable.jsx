import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventAction, getRestaurantsEvents } from '../../component/State/Restaurant/Action';
import AddIcon from "@mui/icons-material/Add";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const EventTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { restaurant, restaurantsEvents } = useSelector((state) => state.restaurant);  // Make sure the selector matches the state structure

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    console.log("Restaurant state:", restaurant);
    if (restaurant && restaurant.usersRestaurant) {
      console.log("Dispatching getRestaurantsEvents with ID:", restaurant.usersRestaurant.id);
      dispatch(getRestaurantsEvents({
        restaurantId: restaurant.usersRestaurant.id,
        jwt,
      }));
    } else {
      console.log("No usersRestaurant available in restaurant state");
    }
  }, [dispatch, jwt, restaurant]);

  const handleDeleteEvent = (eventId) => {
    console.log("Deleting event with ID:", eventId);
    dispatch(deleteEventAction({ eventId, jwt }));
  };

  const handleViewDetails = (event) => {
    console.log("Viewing details for event:", event);
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Closing modal for event:", selectedEvent);
    setOpen(false);
    setSelectedEvent(null);
  };

  console.log("Events state from store:", restaurantsEvents);  // Log events from the store

  return (
    <Box>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {restaurantsEvents && restaurantsEvents.length > 0 ? (
          restaurantsEvents.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card style={{ background: "#555555" }}>
                <CardContent>
                  <Box display="flex" justifyContent="center">
                    <img src={item.images} style={{ width: 200, height: 180, marginBottom: '10px' }} alt={item.name} />
                  </Box>
                  <Typography variant="h6" align="center" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    Starts At: {new Date(item.startedAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    Ends At: {new Date(item.endAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    Location: {item.location}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ fontWeight: 'bold' }}
                    onClick={() => handleDeleteEvent(item.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
              No Events Found
            </Typography>
          </Grid>
        )}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {selectedEvent && (
            <>
              <Divider sx={{ my: 2, bgcolor: '#FDDA0D' }} />
              <Typography id="modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', color: '#FDDA0D', fontWeight: 'bold' }}>
                {selectedEvent.name}
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <img src={selectedEvent.images} style={{ width: 350, height: 250 }} alt={selectedEvent.name} />
              </Box>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                {selectedEvent.description}
              </Typography>
              <Divider sx={{ my: 2, bgcolor: '#FDDA0D' }} />
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
