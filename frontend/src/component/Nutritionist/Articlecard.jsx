import React from 'react'
import {Card,CardMedia,CardContent,Typography,CardActions,IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export const Articlecard=()=> {
  return (
    <div>
        <Card sx={{ width:345 }}>
            <CardMedia
             sx={{height:345}}
             image="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=2048x2048&w=is&k=20&c=rRlOrFqCQn8kBDwvZnN75XFxiD0CA6S2LkgVKQRYJ3k="/>
             <CardContent>
                <Typography variant='h5'>
                    Fast Food
                </Typography>
                <Typography variant='body2'>
                Effects of a cafeteria-based sustainable diet intervention on the adherence to the EAT-Lancet planetary health diet and greenhouse gas emissions of consumers: a quasi-experimental study at a large German hospital
Sustainable diets contribute to improving human health and reducing food-related greenhouse gas emissions (GHGE). Here, we established the effects of a facility-based sustainable diet intervention on the adher...

Authors:
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

