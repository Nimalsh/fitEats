import React from 'react';
import TextField from '@mui/material/TextField';
import { Colours } from '../../assets/theme/theme';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import { TextareaAutosize,Button } from '@mui/material';




function AddFoodMenuCat() {
    
  return (
    <Grid container spacing={3} sx={{ input: { color: "#fff" }, "label": {color: "#fff"}, p:"1%" }} >

            <Grid item xs={12}>
                <TextField
                    required
                    id="Food_Item"
                    name="Food_Item"
                    label="Food Item"
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
                    placeholder="Description about Food Item"
                    style={{ width: "97%", paddingTop: '5px'}}
                    
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    id="Food_Price"
                    name="Food_Price"
                    label="Food Price(Rs.)"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{"& label.Mui-focused": {
                        color:"#fff"
                    }}}
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    required
                    id="Food_Price"
                    name="Food_Price"
                    label="Calories (g)"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{"& label.Mui-focused": {
                        color:"#fff"
                    }}}
                />
            </Grid>


            <Grid item xs={3}>
                <TextField
                    required
                    id="Food_Price"
                    name="Food_Price"
                    label="Fat (g)"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{"& label.Mui-focused": {
                        color:"#fff"
                    }}}
                />
            </Grid>


            <Grid item xs={3}>
                <TextField
                    required
                    id="Food_Price"
                    name="Food_Price"
                    label="Protein (g)"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{"& label.Mui-focused": {
                        color:"#fff"
                    }}}
                />
            </Grid>


            <Grid item xs={3}>
                <TextField
                    required
                    id="Food_Price"
                    name="Food_Price"
                    label="Carbo (g)"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{"& label.Mui-focused": {
                        color:"#fff"
                    }}}
                />
            </Grid>


            <Grid item xs={12}>
                    <Button variant="contained" sx={{color:'#FFFFFF',backgroundColor:"#3E3E3E", '&:hover': {
                        backgroundColor: Colours.darkgray,
                    }}}>
                    Browse
                    </Button>
            </Grid>
    </Grid>
  )
}

export default AddFoodMenuCat