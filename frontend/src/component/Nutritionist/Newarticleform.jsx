import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { createArticle,getArticles } from '../State/Articles/Action'; // Ensure this import path matches your actual file structure

const Newarticleform = ({ onArticleCreated }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt'); // Get JWT token from localStorage

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result); // Base64 image
    };
    reader.readAsDataURL(file); // Convert image to Base64 string
  };

  const handleDescriptionChange = (value) => {
    setDescription(value); // Update content in Quill editor
  };

  // Function to remove HTML tags from content
  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes HTML tags using regex
  };

  const handleSubmit = () => {
    if (!title || !description) {
      console.log('Title and description are required.');
      return;
    }

    const strippedContent = stripHtmlTags(description);
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', strippedContent);
    if (image) {
      const imageBlob = dataURLtoBlob(image);
      formData.append('image', imageBlob, 'image.jpg'); // Ensure correct file name and type
    }
  
    // Dispatch the action to create the article
    dispatch(createArticle(token, formData))
      .then(() => {
        // Call getArticles to fetch the updated list
        dispatch(getArticles(token)).then(() => {
          if (onArticleCreated) onArticleCreated(); // Call the callback to switch to the "Articles" tab
        });
      })
      .catch((error) => {
        console.error('Error creating article:', error);
      });
  };
  
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' }); // Change to your image type, e.g., 'image/png'
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
          <TextField
            label="Title"
            variant="outlined"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Box sx={{ mb: 2 }}>
            <ReactQuill
              value={description}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image', 'video'],
                  ['clean'],
                ],
              }}
              placeholder="Enter the details of your problem"
              style={{ height: '200px' }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add Article
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Newarticleform;
