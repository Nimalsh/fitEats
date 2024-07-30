import React, { useState } from 'react';
import { Box, CardHeader, TextField, Button, IconButton, Grid, CircularProgress } from '@mui/material';
import BackgroundImage from '../../assets/images/item.png'; 
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear'; 
import { Formik, useFormik } from 'formik';
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { AddPhotoAlternate } from '@mui/icons-material';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const initialValues = {
    images: [],
    location: "",
    description: "",
    name: "",
    startAt: dayjs(),
    endAt: dayjs().add(1, 'hour'),
    restaurantId: '' 
};

export const AddEvent = () => {
  const [uploadImages, setUploadImage] = useState(false);

  const [open,setOpen] = React.useState(false);
  const handleopen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = React.useState()

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {  
        restaurantId: {
          id: 1,
        },
        images: values.images,
        location: values.location,
        description: values.description,
        name: values.name,
        startAt: values.startAt,
        endAt: values.endAt, 
      };
      console.log("data ---", data);
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const handleAddEvent = (e) => {
     e.preventDefault ()
     console.log("submit", formik.values);
     setValues(initialValues);
  };

  const handleClearForm = () => {
    formik.resetForm();
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
          title="Add New Offer"
          sx={{ pt: 2, alignItems: 'center', color: 'white' }}
        />
        
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid className='flex flex-wrap gap-5' items xs={12}>
            <input
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
              type="file"
            />
            <label className='relative' htmlFor="fileInput">
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md bordergrey-600 text-black'>
                <AddPhotoAlternate className=''/>
              </span>
              {uploadImages && (
                <div className='absolute left-0-right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress/>
                </div>
              )}
            </label>
            <div className='flex flex-wrap gap-2'>
              {formik.values.images.map((image, index) => (
                <div className='relative' key={index}>
                  <img className='w-24 h-24 object-cover' src={image} alt="" />
                  <IconButton 
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      outline: "none"
                    }}
                    onClick={() => handleRemoveImage(index)} 
                  >
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <TextField fullWidth
            id="name"
            name="name"
            label="Offer Name"
            variant="outlined" 
            onChange={formik.handleChange}
            value={formik.values.name} 
            sx={{
              marginBottom: '20px',
              marginTop: '50px',
              backgroundColor: '#000000',
              borderRadius: 1,
              'label': { color: '#fff' },
              '& label.Mui-focused': { color: '#fff' },
            }}         
          />
          <TextField fullWidth
            id="location"
            name="location"
            label="Location"
            variant="outlined" 
            onChange={formik.handleChange}
            value={formik.values.location} 
            sx={{
              marginBottom: '20px',
              marginTop: '50px',
              backgroundColor: '#000000',
              borderRadius: 1,
              'label': { color: '#fff' },
              '& label.Mui-focused': { color: '#fff' },
            }}         
          />
          <TextField fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined" 
            onChange={formik.handleChange}
            value={formik.values.description} 
            sx={{
              marginBottom: '20px',
              marginTop: '50px',
              backgroundColor: '#000000',
              borderRadius: 1,
              'label': { color: '#fff' },
              '& label.Mui-focused': { color: '#fff' },
            }}         
          />
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="Start Date and Time"
                value={formik.values.startAt}
                onChange={(newValue) => formik.setFieldValue("startAt", newValue)}
                inputFormat="MM/DD/YYYY hh:mm A"
                className='w-full'
                sx={{ marginBottom: '5px', backgroundColor: '#000000', borderRadius: 1 }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker 
                renderInput={(props) => <TextField {...props} />}
                label="End Date and Time"
                value={formik.values.endAt}
                onChange={(newValue) => formik.setFieldValue("endAt", newValue)}
                inputFormat="MM/DD/YYYY hh:mm A"
                className='w-full'
                sx={{ marginBottom: '20px', backgroundColor: '#000000', borderRadius: 1 }}
              />
            </LocalizationProvider>
          </Grid>   
          <Box sx={{ display: 'flex', gap: 2 }}>
            <div className="button-container mt-5">
              <button type="submit" className="button add-button" onClick={handleAddEvent}>
                <AddIcon /> Add
              </button>
              <button type="submit" className="button delete-button" onClick={handleClearForm}>
                <ClearIcon /> Clear
              </button>
            </div>
          </Box>
        </form>
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      > 
      </Box>
    </Box>
  );
};
