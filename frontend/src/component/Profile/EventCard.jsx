import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const EventCard = ({ event }) => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia sx={{ height: 345 }} image={event.images[0] || "default-image-url.jpg"} />
        <CardContent>
          <Typography variant="h5">{event.name}</Typography>
          <Typography variant="body2">{event.description}</Typography>
          <div className="py-2 space-y-2">
            <p>{event.location}</p>
            <p className="text-sm text-blue-500">{new Date(event.startedAt).toLocaleString()}</p>
            <p className="text-sm text-red-500">{new Date(event.endAt).toLocaleString()}</p>
          </div>
        </CardContent>
        <CardActions>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};
