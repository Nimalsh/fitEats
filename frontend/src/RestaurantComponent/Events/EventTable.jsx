import React, { useState } from 'react';
import { Box, CardHeader, Typography, Dialog, DialogTitle, DialogActions } from '@mui/material';
import EventImage from '../../assets/images/offer.jpg'; // replace with actual image import
import BackgroundImage from '../../assets/images/Background_image.png';
import AddIcon from '@mui/icons-material/Add'; 
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { Link } from 'react-router-dom';

// Dummy data for demonstration purposes
const events = [
  { id: 1, name: "Event 1", image: EventImage, startDate: "2024-07-20", startTime: "10:00 AM", endDate: "2024-07-20", endTime: "12:00 PM" },
  { id: 2, name: "Event 2", image: EventImage, startDate: "2024-07-21", startTime: "01:00 PM", endDate: "2024-07-21", endTime: "03:00 PM" },
  // add more events as needed
];

const EventTile = ({ event }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log(`Deleting event ${event.id}`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 400,
        margin: 2,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(64, 64, 64, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <img
        src={event.image}
        alt={event.name}
        style={{ width: 150, height: 150, boxShadow: '0 12px 24px rgba(255, 255, 255, 0.5)' }}
      />
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {event.name}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Start: {event.startDate} {event.startTime}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        End: {event.endDate} {event.endTime}
      </Typography>

      <button type="button" className="button details-button" sx={{ width: '70%' }}>
        <Link to={`../event/${event.id}`}>View Details</Link>
      </button>

      <div className="button-container mt-5">
        <Link to={`../event/update/${event.id}`} className="button update-button">
          <UpdateIcon /> Update
        </Link>
        <button type="button" className="button delete-button" onClick={handleClickOpen}>
          <DeleteIcon /> Delete
        </button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Are you sure you want to delete {event.name}?</DialogTitle>
          <DialogActions>
            <button type="button" className="button add-button mb-5 mr-5" onClick={handleDelete} autoFocus>
              Yes
            </button>
            <button type="button" className="button add-button mb-5 mr-5" onClick={handleClose}>
              No
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export const EventTable = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <div>
        <CardHeader
          action={
            <Link to='../event/add'>
              <button className="button add-button">
                <AddIcon /> Add Event
              </button>
            </Link>
          }
          title="Events"
          sx={{ pt: 2, alignItems: "center" }}
        />

        <div>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: 2,
            }}
          >
            {events.map((event) => (
              <EventTile key={event.id} event={event} />
            ))}
          </Box>
        </div>
      </div>
    </Box>
  );
};


