import { Grid, Modal, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: '',
  location: '',
  name: '',
  startedAt: null,
  endAt: null,
}

export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = React.useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log("submit", formValues)
   setFormValues (initialValues)
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  return (
    <div className="p-5">
      <button onClick={handleOpen} variant="contained" className="button add-button">
        Create New Event
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
        <h1 className='text-center text-xl pb-10'>Create New Event</h1>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) => handleDateChange(newValue, 'startedAt')}
                    inputFormat="MM/DD/YYYY hh:mm A"
                    className="w-full"
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formValues.endAt}
                    onChange={(newValue) => handleDateChange(newValue, 'endAt')}
                    inputFormat="MM/DD/YYYY hh:mm A"
                    className="w-full"
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button 
              className='button add-button' 
              variant="contained" 
              type='submit'
              style={{marginTop:'10px' , }}>
                Create Event
              </button>
              </div>
          </form>

        </Box>
      </Modal>
    </div>
  );
};
