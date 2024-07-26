import React, { useState } from 'react';
import { Box, CardHeader, TextField, Button, IconButton, Grid } from '@mui/material';
import BackgroundImage from '../../assets/images/Add.jpg';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import axios from 'axios';
import { useFormik } from 'formik';

const initialValues={
  name: '',
  description: '',
  openingDays: 'Mon-Sun',
  openingHoursFrom: '',
  openingHoursTo: '',
  cuisineType: '',
  address: '',
  city: '',
  district: '',
  postalCode: '',
  email: '',
  mobileNumber: '',
  image: null,
  businessRegNumber: '',
  businessRegCertImage: null,
}

export const CreateRestaurantForm = () => {
   
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
        const data = {
          name:values.name,
          describe:values.description,
          openingDays:values.openingDays,
          openingHoursFrom:values.openingHoursFrom,
          openingHoursTo:values.openingHoursTo,
          cuisineType:values.cuisineType,
          location:{
            address:values.address,
            city:values.city,
            district:values.district,
            postalCode:values.postalCode,
          },
         contact:{
          email:values.email,
          mobileNumber:values.mobileNumber,
         },
          image:values.image,
          businessRegNumber:values.businessRegNumber,
          businessRegCertImage:values.businessRegCertImage
        }
    }
  })
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    openingDays: '',
    openingHoursFrom: '',
    openingHoursTo: '',
    cuisineType: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    email: '',
    mobileNumber: '',
    image: null,
    businessRegNumber: '',
    businessRegCertImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = async(e) => {
    // if (e.target.files && e.target.files[0]) {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     [fieldName]: e.target.files[0],
    //   }));
    // }
    const file = e.target.files[0] 
    const image = await uploadImageToCloudinary(file)
    formik.setFieldValue("images",[...formik.values.image])
  };

  const handleRemoveImage = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: null,
    }));
  };


  const handleClearForm = () => {
    setFormData({
      name: '',
      description: '',
      openingDays: 'everyday',
      openingHoursFrom: '',
      openingHoursTo: '',
      cuisineType: '',
      address: '',
      city: '',
      district: '',
      postalCode: '',
      email: '',
      mobileNumber: '',
      image: null,
      businessRegNumber: '',
      businessRegCertImage: null,
    });
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;
      let businessRegCertImageUrl = null;
  
      if (formData.image) {
        imageUrl = await uploadImageToCloudinary(formData.image);
      }
  
      if (formData.businessRegCertImage) {
        businessRegCertImageUrl = await uploadImageToCloudinary(formData.businessRegCertImage);
      }
  
      const formDataToSubmit = {
        ...formData,
        image: imageUrl,
        businessRegCertImage: businessRegCertImageUrl,
      };
  
      const response = await axios.post('/api/restaurants', formDataToSubmit);
  
      if (response.status === 201) {
        console.log('Restaurant created successfully:', response.data);
        handleClearForm();
      } else {
        console.error('Failed to create restaurant:', response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '60%',
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: 10,
          padding: 4,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardHeader
          title="Restaurant Sign Up"
          sx={{ pt: 2, alignItems: 'center', color: 'white', textAlign: 'center', marginBottom: '50px', fontWeight: 'bold' }}
        />

        <form onSubmit={formik.handleSubmit}>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />

            <TextField
              label="Cuisine Type"
              name="cuisineType"
              value={formik.values.cuisineType}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="District"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              rows={4}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Opening Days"
              name="openingDays"
              value={formik.values.openingDays}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Opening Hours (From)"
              name="openingHoursFrom"
              value={formik.values.openingHoursFrom}
              onChange={formik.handleChange}
              type="time"
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Opening Hours (To)"
              name="openingHoursTo"
              value={formik.values.openingHoursTo}
              onChange={formik.handleChange}
              type="time"
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <TextField
              label="Business Registration Number"
              name="businessRegNumber"
              value={formik.values.businessRegNumber}
              onChange={formik.handleChange}
              fullWidth
              sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1, 'label': { color: '#fff' }, '& label.Mui-focused': { color: '#fff' }, '& .MuiInputBase-input': { color: '#fff' } }}
            />
            <Button
              type="button"
              variant="contained"
              component="label"
              sx={{
                width: '70%',
                backgroundColor: '#95CD41',
                borderRadius: '20px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                marginBottom: '20px',
                textTransform: 'none'
              }}
            >
              Upload Restaurant Image
              <input
                id="fileInput"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'image')}
                // onChange = {handleImageChange}
              />
            </Button>
            <Button
              type="button"
              variant="contained"
              component="label"
              sx={{
                width: '100%',
                backgroundColor: '#95CD41',
                borderRadius: '20px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                marginBottom: '20px',
                textTransform: 'none'
              }}
            >
              Upload Business Registration Certificate Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'businessRegCertImage')}
              />
            </Button>
          </Grid>
        </Grid>
        </form>

        {formData.image && (
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Restaurant"
              style={{ width: 150, height: 150 }} 
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
              onClick={() => handleRemoveImage("image")}
            >
              <CloseIcon sx={{fontSize:'1rem'}} />
            </IconButton>
          </Box>
        )}

        {formData.businessRegCertImage && (
          <Box
            sx={{
              marginBottom: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <img
              src={URL.createObjectURL(formData.businessRegCertImage)}
              alt="Business Registration Certificate"
              style={{ width: 150, height: 150 }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              }}
              onClick={() => handleRemoveImage('businessRegCertImage')}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <div className="button-container mt-5">
            <button type="button" className="button add-button" onClick={handleSubmit}>
              <AddIcon /> Sign Up
            </button>
            <button type="button" className="button delete-button" onClick={handleClearForm}>
              <ClearIcon /> Clear
            </button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
