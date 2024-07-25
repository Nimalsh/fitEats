import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia,TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Newarticleform = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <Card sx={{ display: 'flex', p: 2, width: '80%', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300 }}>
        <CardMedia
          component="img"
          sx={{ width: '100%' }}
          image={image || 'https://via.placeholder.com/300'}
          alt="Article Image"
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          sx={{ mt: 2 }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Add New Article
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField label="Title" variant="outlined" sx={{ mb: 2 }} />
          <Box sx={{ mb: 2 }}>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{size: []}],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, 
                   {'indent': '-1'}, {'indent': '+1'}],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }}
              placeholder="Enter the details of your problem"
              style={{ height: '200px' }} // Adjust the height as needed
            />
          </Box>
          <Button variant="contained" color="primary">
            Add Article
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Newarticleform;
