import React, { useState } from 'react';
import { Box, CardHeader, TextField, Button, IconButton, Grid, CircularProgress } from '@mui/material';
import BackgroundImage from '../../assets/images/item.png'; 
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear'; 
import { useFormik } from 'formik'
import CloseIcon from "@mui/icons-material/Close"
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/Action';

const initialValues = {
  categoryName: '', 
  images: [], 
  restaurantId:''
}

export const CreateFoodCategory = () => {

  const {restaurant} = useSelector((store) => store);
  const dispatch = useDispatch()
 
  const [uploadImages,setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
        const data = {
            categoryName:values.categoryName,
            images:values.images, 
            restaurantId:{
              id : 1,
            },
          };
          
          dispatch(createCategoryAction({reqData:data,jwt:localStorage.getItem("jwt")}))
          console.log("data ---",data)
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

  const handleAddCategory = () => {
    // console.log('Category Added:', categoryName, image);
    // setCategoryName('');
    // setImage(null);
  };

  const handleClearForm = () => {
    // setCategoryName('');
    // setImage(null);
  };

  const handleSubmit = () => {

  }

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
          width: '35%', 
          backgroundColor: 'rgba(64, 64, 64, 0.8)',
          borderRadius: 10,
          padding: 4,
          marginLeft:'30%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardHeader
          title="Add Food Category"
          sx={{ pt: 2, alignItems: 'center', color: 'white' }}
        />
        
        <form onSubmit={formik.handleSubmit} className='space-y-4'>


<Grid className='flex flex-wrap gap-5' items xs={12}>

<input
accept = 'image/*'
id='fileInput'
style={{display:"none"}}
onChange = {handleImageChange}
type="file"/>

<label className='relative' htmlFor="fileInput">
    <span className='w-24 h-24 cursor-pointer flex items-center justify-center
    p-3 border rounded-md bordergrey-600 text-black'><AddPhotoAlternate className=''/></span>
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

        <TextField fullWidth
          id="categoryName"
          name="categoryName"
          label="Category Name"
          variant="outlined" 
          onChange={formik.handleChange}
          value={formik.values.categoryName} 
          sx={{
            marginBottom: '20px',
            marginTop:'50px',
            backgroundColor: '#000000',
            borderRadius: 1,
            'label': { color: '#fff' },
            '& label.Mui-focused': { color: '#fff' },
          }}         
        ></TextField>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <div className="button-container mt-5">
            <button type="submit" className="button add-button" onClick={handleAddCategory}>
              <AddIcon /> Add
            </button>
            <button type="button" className="button delete-button" onClick={handleClearForm}>
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
          justifyContent: 'flex-end', // Align image to the right
          alignItems: 'center',
        }}
      > 
      </Box>
    </Box>
  );
};
