import { Button, FormControl, InputLabel, Select } from '@mui/material';
import React, { useState } from 'react'

export const CreateIngredientForm = () => {

    const [formData, setFormData] = useState({
        name:"", 
    });

    const handleSubmit = () => {
        
        console.log(formData)
    };

    const handleInputChange = (e) => {
        const{ name , value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl b-10'>
                Create Category
            </h1>

            <form className='space-y-5' onSubmit={handleSubmit}>
                <TestField
                fullwidth
                id="name"
                name="name"
                label="Category"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}>
                </TestField>

                <Grid  item xs={12} lg={3}>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formData.ingredientCategoryId}
    label="Category"
    onChange={handleInputChange}
    name="ingredientCategoryId"
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>
                </Grid>

                <Button variant="contained" type="submit">

                </Button>
            </form>
        </div>
    </div>
  )
}

