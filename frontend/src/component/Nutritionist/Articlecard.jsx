import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const Articlecard = ({ image, title, description, location, datePublished, dateUpdated, showDelete }) => {
  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant='h5'>
          {title}
        </Typography>
        <Typography variant='body2'>
          {description}
        </Typography>
        <div className="py-2 space-y-2">
          
          <p className="text-sm text-blue-500">{datePublished}</p>
         
        </div>
      </CardContent>
      {showDelete && (
        <CardActions>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};
