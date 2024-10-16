import { AddPhotoAlternate } from '@mui/icons-material';
import CloseIcon from "@mui/icons-material/Close";
import { Box, CardHeader, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BackgroundImage from '../../assets/images/item.png';
import { createRestaurant } from '../../component/State/Restaurant/Action';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';

const initialValues = {
    name: '',
    description: '',
    // openingDays: 'Mon-Sun', 
    openingHours: 'Mon-Sun',
    cuisineType: '',
    streetAddress: '',
    city: '',
    district: '',
    postalCode: '',
    email: '',
    mobileNumber: '',
    instagram:'',
    facebook:'',
    twitter:'',
    images: [], 
}

export const CreateRestaurantForm = () => {

  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  const [uploadImages, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
        const data = {
            name: values.name,
            description: values.description, // Correct field name
            openingDays: values.openingDays, 
            cuisineType: values.cuisineType,
            address: {
              streetAddress: values.streetAddress, // Correct field name
              city: values.city,
              district: values.district,
              postalCode: values.postalCode,
            },
            contactInformation: { // Correct field name
              email: values.email,
              mobileNumber: values.mobileNumber,
              instagram: values.instagram,
              twitter: values.twitter,
              facebook: values.facebook,
            },
            openingHours:values.openingHours,
            images: values.images, 
          }

          console.log("data ---",data)

          dispatch(createRestaurant({ data, token: jwt }))
    }
  })  

  const handleImageChange = async(e) => {
    const file = e.target.files[0]
    setUploadImage(true)
    const image = await uploadImageToCloudinary(file) 
    formik.setFieldValue("images", [...formik.values.images, image])
    setUploadImage(false)
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages)
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
        justifyContent: 'space-between', // Align items to the left and right
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '75%', 
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: 10,
          padding: 4,
          marginLeft: '12%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardHeader
          title="Add New Restaurant"
          sx={{ pt: 2, alignItems: 'center', color: 'white' }}
        />
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' items xs={12}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                type="file" 
              />
              <label className='relative' htmlFor="fileInput">
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center
                  p-3 border rounded-md bordergrey-600'>
                  <AddPhotoAlternate className='text-white'/>
                </span>
                {uploadImages && <div className='absolute left-0-right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress/>
                </div>}
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div className='relative'>
                    <img className='w-24 h-24 object-cover' 
                      key={index}
                      src={image} alt="" />
                    <IconButton 
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        outline: "none"
                      }}
                      onClick={() => handleRemoveImage(index)} >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="cuisineType"
                name="cuisineType"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <TextField fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
        
            <Grid item xs={12}>
              <TextField fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="district"
                name="district"
                label="District"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.district}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="mobileNumber"
                name="mobileNumber"
                label="Mobile Number"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobileNumber}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth
                id="facebook"
                name="facebook"
                label="Facebook"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.facebook}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />
            </Grid>
          </Grid>
          <div className='flex justify-center'>
            <button 
              type='submit'
              className='button add-button'
            >
              Create Restaurant
            </button>
          </div>
        </form>
      </Box>
    </Box>
  );
};
