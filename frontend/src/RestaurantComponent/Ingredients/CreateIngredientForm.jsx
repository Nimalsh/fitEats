import { Button, FormControl, InputLabel, Select } from '@mui/material';
import React, { useState } from 'react'

const ingredientCategories = [
    { id: 1, name: "Vegetables", ingredients: ["Tomato", "Onion", "Pepper", "Carrot", "Broccoli"] },
    { id: 2, name: "Fruits", ingredients: ["Apple", "Banana", "Orange", "Strawberry", "Grapes"] },
    { id: 3, name: "Dairy", ingredients: ["Milk", "Cheese", "Butter", "Yogurt", "Cream"] },
    { id: 4, name: "Meat", ingredients: ["Chicken", "Beef", "Pork", "Lamb", "Turkey"] },
    { id: 5, name: "Cerals", ingredients: ["Salt", "Pepper", "Cumin", "Turmeric", "Paprika"] } 
  ];
  

export const CreateIngredientForm = () => {

    const [formData, setFormData] = useState({
        name:"",
        ingredientCategoryId:"",
    });

    const handleSubmit = () => {
        const data = {
            name: FormData.categoryName,
            restaurantId: {
                id:1,
            },
        };
        console.log(data)
    };

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
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
                id="categoryName"
                name="categroyName"
                label="Category Name"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.categoryName}>
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

