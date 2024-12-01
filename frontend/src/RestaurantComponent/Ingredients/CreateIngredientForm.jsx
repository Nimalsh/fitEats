import { FourGMobiledataRounded } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { createIngredient, createIngredientCategory } from '../../component/State/ingredients/Action'

export const CreateIngredientForm = () => {

  const {restaurant,ingredients} = useSelector(store=>store)
  const dispatch = useDispatch();
  const [ formData , setFormData ] = useState({name:'', categoryId:''})

  const jwt = localStorage.getItem("jwt")

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurant.id,
    }; 
    dispatch(createIngredient({data,jwt}))
    console.log(data)
    
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target
    setFormData({
      ...formData,[name]:value
    })
  }

  return (
    <div>
      <div className='p-5'
      style={{
        background: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '40px',
        margin: '20px',
      }} 
      >
        <h1 className='text-center text-xl pb-10'>Create Ingredient</h1>

        <form className='space-y-5' onSubmit={handleSubmit} >
        <TextField fullWidth
                id="name"
                name="name"
                label="Ingredient Name"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
                sx={{ 
                  backgroundColor: '#000000',
                  borderRadius: 1,
                  'label': { color: '#fff' },
                  '& label.Mui-focused': { color: '#fff' },
                }} 
              />

              <FormControl fullWidth style={{background:'black'}}>
                <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  value={formData.ingredientCategoryId}
                  label="Category"
                  onChange={handleInputChange}
                  name="categoryId"
                >
                  {ingredients.category.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)
                    }
                </Select>
              </FormControl>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button 
              className='button add-button' 
              variant="contained" 
              type='submit'
              style={{marginTop:'10px' , }}>
                Create Ingredient
              </button>
              </div>
        </form>
      </div>
    </div>
  )
}
