import React from 'react';
import { useParams } from 'react-router-dom';
import { CardHeader, Typography } from '@mui/material';
import BackgroundImage from '../../assets/images/item.png';
import EventImage from '../../assets/images/offer.jpg';  

// Dummy data for demonstration purposes
const events = [
  { id: 1, name: "Event 1", image: EventImage, startDate: "2024-07-20", startTime: "10:00 AM", endDate: "2024-07-20", endTime: "12:00 PM", description: "Description for Event 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." },
  { id: 2, name: "Event 2", image: EventImage, startDate: "2024-07-21", startTime: "01:00 PM", endDate: "2024-07-21", endTime: "03:00 PM", description: "Description for Event 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam." },
  // add more events as needed
];

export const EventDetails = () => {
  const { eventId } = useParams();
  const event = events.find(event => event.id === parseInt(eventId));

  if (!event) {
    return <Typography variant="h4">Offer Not Found</Typography>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: '10px',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <CardHeader
          title={<Typography variant="h4" style={{ color: 'white', fontWeight: 'bold' }}>{event.name}</Typography>}
          sx={{ pt: 2, alignItems: 'center' }}
        />
        <img
          src={event.image}
          alt={event.name}
          style={{ width: '50%', height: 'auto', borderRadius: '10px', marginTop: '16px' }}
        />
        <Typography variant="body1" style={{ color: 'white', marginTop: '16px' }}>
          {event.description}
        </Typography>
        <Typography variant="body2" style={{ color: 'white', marginTop: '8px' }}>
          Start: {event.startDate} {event.startTime}
        </Typography>
        <Typography variant="body2" style={{ color: 'white', marginTop: '8px' }}>
          End: {event.endDate} {event.endTime}
        </Typography>
        <button className='details-button'
          variant="contained"
          color="primary"
          style={{ marginTop: '16px', width: '50%' }}
        >
          Get Offer Now
        </button>
      </div>
    </div>
  );
};
