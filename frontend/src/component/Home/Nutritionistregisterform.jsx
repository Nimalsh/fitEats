import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
  Box,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createNutritionistRequest } from '../State/Nutritionist/Action'; // Adjust the path as needed

const NutritionistForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    age: '',
    experience: '',
    qualifications: '',
    specializations: '',
    document: null,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createNutritionistRequest({
        fullName: formData.fullName,
        email: formData.email,
        qualifications: formData.qualifications,
        experience: formData.experience,
        specializations: formData.specializations,
        documents: formData.document,
      })
    );

    // Show the dialog
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // Redirect to another page
    navigate('/'); // Replace '/some-page' with the actual route
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" align="center" gutterBottom>
          Nutritionist Application Form
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormControl fullWidth margin="normal">
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Experience (in years)"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Qualifications"
              name="qualifications"
              multiline
              rows={4}
              value={formData.qualifications}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Specializations"
              name="specializations"
              multiline
              rows={4}
              value={formData.specializations}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Upload Document</FormLabel>
            <Box sx={{ mt: 1 }}>
              <input
                name="document"
                type="file"
                onChange={handleFileChange}
                required
              />
            </Box>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            Submit
          </Button>
        </form>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Submission Successful</DialogTitle>
          <DialogContent>
            Your application has been submitted successfully. You will be notified once your request is confirmed.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default NutritionistForm;
