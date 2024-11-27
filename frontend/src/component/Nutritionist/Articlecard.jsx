import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function Articlecard({ image, title, content, publishedDate, author, onEdit, onDelete }) {
  return (
    <Card sx={{ width: 300, position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Check if image is provided, if so, render it as a Base64 string */}
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={`data:image/jpeg;base64,${image}`} // Display the Base64-encoded image
          alt={title}
        />
      )}
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {author} | {publishedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {content}
        </Typography>
      </CardContent>
      {/* Bottom action section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '8px 16px',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        {/* Edit button triggers the onEdit callback */}
        <IconButton size="small" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        {/* Delete button triggers the onDelete callback */}
        <IconButton size="small" color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
