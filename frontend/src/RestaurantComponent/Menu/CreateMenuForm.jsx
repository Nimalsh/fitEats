import { AddPhotoAlternate, Margin } from '@mui/icons-material';
import { Box, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close"
import RestaurantImage from '../../assets/images/Restaurant.jpeg'; 
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';

const initialValues = {
    name: '',
    description: '', 
    price:'',
    category:'',
    restaurantId:'',
    vegetarian:'true',
    seosonal:'false',
    ingredients:[],
    images: [], 
};


export const CreateMnuForm = () => {

  const [uploadImages,setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
          values.restaurantId = 2
          console.log("data ---",values)
    }
  })  

  const handleImageChange = async(e) => {
    const file = e.target.files[0]
    setUploadImage(true)
    const image = await uploadImageToCloudinary(file) 
    formik.setFieldValue("images",[...formik.values.images,image])
    setUploadImage(false)
  };

  const handleRemoveImage=(index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index,1);
    formik.setFieldValue("images", updatedImages)
  };


  return (
    <div className='py-10 px-5 lg:flex items-center min-h-screen gap-10 mt-20 ml-20 mr-20'>

        <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2 absolute top-0 left-1/2 transform -translate-x-1/2 mt-10 mb-10'>
           Add New item
        </h1> 

        </div>

        <form onSubmit={formik.handleSubmit} className='space-y-4'>
            <Grid container spacing = {2}>
                <Grid className='flex flex-wrap gap-5' items xs={12}>

                    <input
                    accept = 'image/*'
                    id='fileInput'
                    style={{display:"none"}}
                    onChange = {handleImageChange}
                    type="file"/>

                    <label className='relative' htmlFor="fileInput">
                        <span className='w-24 h-24 cursor-pointer flex items-center justify-center
                        p-3 border rounded-md bordergrey-600'><AddPhotoAlternate className='text-white'/></span>
                        {
                            uploadImages && <div className='absolute left-0-right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                                <CircularProgress/>
                            </div>
                        }
                    </label>

<div className='flex flex-wrap gap-2'>
  {formik.values.images.map((image, index) => (
    <div className='relative'>
      <img className='w-24 h-24 object-cover' 
        key={index}
        src={image} alt=""/>
      <IconButton 
        size="small"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          outline: "none"
        }}
        onClick={() => handleRemoveImage(index)} >
        <CloseIcon sx={{fontSize:"1rem"}}/>
      </IconButton>
    </div>
  ))}
</div>

                </Grid>

                <Grid  item xs={12}>
                    <TextField fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.name}>
                    </TextField>

                </Grid>
                <Grid  item xs={12}>
                    <TextField fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.description}>
                    </TextField>
                </Grid>
                <Grid  item xs={12} lg={6}>
                    <TextField fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.price}>
                    </TextField>

                </Grid>

                <Grid  item xs={12} lg={3}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.category}
    label="Category"
    onChange={formik.handleChange}
    name="category"
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
                </Grid>

                <Grid  item xs={12} lg={3}>
                <FormControl fullwidth>
        <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name="ingredients"
          multiple
          value={formik.values.ingredients}
          onChange={formik.handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
         // MenuProps={MenuProps}
        >
          {["bread","sauce"].map((name,index) => (
            <MenuItem
              key={name}
              value={name}
               
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                </Grid> 

                <Grid  item xs={12} lg={3}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="seasonal"
    value={formik.values.seosonal}
    label="Is Seasonal"
    onChange={formik.handleChange}
    name="seasonal"
  >
    <MenuItem value={true}>Yes</MenuItem>
    <MenuItem value={false}>No</MenuItem> 
  </Select>
</FormControl>
                </Grid>

                <Grid  item xs={12} lg={3}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="vegetarian"
    value={formik.values.vegetarian}
    label="Is Vegetarian"
    onChange={formik.handleChange}
    name="vegetarian"
  >
    <MenuItem value={true}>Yes</MenuItem>
    <MenuItem value={false}>No</MenuItem> 
  </Select>
</FormControl>
                </Grid>
            </Grid>

            <button type='submit' className='button add-button'>
                 Create Restaurant
            </button>

        </form>
    </div>
  )
}
