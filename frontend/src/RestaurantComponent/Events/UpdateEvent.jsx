import React, { useState, useEffect } from 'react';
import { Box, CardHeader, TextField, Button, styled } from '@mui/material';
import BackgroundImage from '../../assets/images/Add.jpg';
import UpdateIcon from '@mui/icons-material/Update';
import ClearIcon from '@mui/icons-material/Clear';
import { useParams, Link } from 'react-router-dom';

// Styled TextField to change the calendar icon color
const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': { color: '#fff' },
  '& label': { color: '#fff' },
  '& label.Mui-focused': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
  '& .MuiInputAdornment-root svg': {
    color: '#fff',
  },
});

export const UpdateEvent = () => {
  const { eventId } = useParams();
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch the event name based on the eventId
    const fetchEventDetails = async () => {
      // Mock fetching event details, replace with actual API call
      const eventDetails = {
        1: { name: 'Event 01', startDate: '2024-07-20', startTime: '10:00 AM', endDate: '2024-07-20', endTime: '12:00 PM', description: 'Description of Event 01' },
        2: { name: 'Event 02', startDate: '2024-07-21', startTime: '01:00 PM', endDate: '2024-07-21', endTime: '03:00 PM', description: 'Description of Event 02' },
        // Add more event details as needed
      };
      const event = eventDetails[eventId];
      if (event) {
        setEventName(event.name);
        setStartDate(event.startDate);
        setStartTime(event.startTime);
        setEndDate(event.endDate);
        setEndTime(event.endTime);
        setDescription(event.description);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleNameChange = (event) => setEventName(event.target.value);
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleStartTimeChange = (event) => setStartTime(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);
  const handleEndTimeChange = (event) => setEndTime(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpdateEvent = () => {
    // Update event logic
    console.log('Event Updated:', eventName, startDate, startTime, endDate, endTime, description, image);
    setEventName('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setDescription('');
    setImage(null);
  };

  const handleClearForm = () => {
    setEventName('');
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setDescription('');
    setImage(null);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '35%',
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: 10,
          padding: 4,
          marginLeft: '30%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardHeader
          title={`Update ${eventName}`}
          sx={{ pt: 2, alignItems: 'center', color: 'white' }}
        />

        <CustomTextField
          id="event_name"
          label="Event Name"
          value={eventName}
          onChange={handleNameChange}
          sx={{ marginBottom: '20px', marginTop: '20px', backgroundColor: '#000000', borderRadius: 1 }}
          fullWidth
        />

        <CustomTextField
          id="start_date"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1 }}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <CustomTextField
          id="start_time"
          label="Start Time"
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1 }}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <CustomTextField
          id="end_date"
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1 }}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <CustomTextField
          id="end_time"
          label="End Time"
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
          sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1 }}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <CustomTextField
          id="description"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1 }}
          fullWidth
        />

        <Button
          type="button"
          variant="contained"
          component="label"
          sx={{
            width: '70%',
            backgroundColor: '#95CD41',
            borderRadius: '20px',
            height: '70%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        {image && (
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={image}
              alt="Event"
              style={{ width: 150, height: 150, borderRadius: '50%' }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <div className="button-container mt-5">
            <button type="button" className="button add-button" onClick={handleUpdateEvent}>
              <UpdateIcon /> Update
            </button>
            <button type="button" className="button delete-button" onClick={handleClearForm}>
              <ClearIcon /> Clear
            </button>
          </div>
        </Box>
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {/* Additional content can be added here */}
      </Box>
    </Box>
  );
};
