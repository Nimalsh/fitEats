import React from 'react'
import {Card,CardMedia,CardContent,Typography,CardActions,IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export const Plancard=()=> {
  return (
    <div>
        <Card sx={{ width:345 }}>
            <CardMedia
             sx={{height:345}}
             image="https://cdn.pixabay.com/photo/2020/02/01/06/13/vegan-4809593_640.jpg"/>
             <CardContent>
                <Typography variant='h5'>
                    Fast Food
                </Typography>
                <Typography variant='body2'>
                   50% off on your 1st order
                </Typography>
                <div className="py-2 space-y-2">
                   <p>{"mumbai"}</p>
                   <p className="text-sm text-blue-500">February 14, 2024 12:00nAM</p>
                   <p className="text-sm text-red-500">February 14, 2024 12:00nAM</p>

                </div>
             
             </CardContent>
             {true && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
             </CardActions>}
        </Card>
        
    </div>
  )
}

