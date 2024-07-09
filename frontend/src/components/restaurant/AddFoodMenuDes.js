import * as React from 'react';

import { Box,TextareaAutosize,Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Colours } from '../../assets/theme/theme';//to use theme provider,need to import this



function AddFoodMenuDes() {
  return (

    <div>
    <Box color="#fff" bgcolor="#171717" opacity="50" sx= {{borderRadius: '20px',p:"3%", width:{lg:"45vw",xs:"55vw"} }} >
    
      <Typography variant="h4" gutterBottom sx= {{fontSize:{lg:"230%",xs:"180%"} }} >
           Add Foods Menu
      </Typography>

      <Grid container spacing={3} sx={{ input: { color: "#fff" }, "label": {color: "#fff"}, p:"1%" }} >

            <Grid item xs={12}>
                <TextField
                    required
                    id="Menu_Title"
                    name="Menu_Title"
                    label="Menu Title"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{"& label.Mui-focused": {
                        color:"#fff"
                    }}}
                />
            </Grid>

            <Grid item xs={12} > 
                <TextareaAutosize
                    placeholder="Description about Menu"
                    style={{ width: "100%", paddingTop: '5px'}}
                    
                />
            </Grid>
        
            <Grid item xs={12}>
                <Button variant="contained" sx={{color:'#FFFFFF',backgroundColor:"#3E3E3E", '&:hover': {
                    backgroundColor: Colours.darkgray,
                }}}>
                Browse
                </Button>
            </Grid>

            <Grid item container justifyContent="flex-end">

                <Button variant="contained" sx={{color:'#000',backgroundColor:"#EFEAEA", '&:hover': {
                    backgroundColor: Colours.formWhite,
                }}}>
                Next
                </Button>
            </Grid>

      </Grid>

          

    </Box>

           
    </div>
  )
}

export default AddFoodMenuDes