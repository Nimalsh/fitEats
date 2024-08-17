import { FourGMobiledataRounded } from '@mui/icons-material'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredientCategory } from '../../component/State/ingredients/Action'

export const CreateIngredientCategoryForm = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { restaurant } = useSelector(store=>store)

  const [ formData , setFormData ] = useState({name:''})

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name : formData.name,
      restaurantId: restaurant.usersRestaurant.id
    }
    console.log(formData);
    dispatch(createIngredientCategory({data,jwt}))
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
        <h1 className='text-center text-xl pb-10'>Create Ingredient Category</h1>

        <form className='space-y-5' onSubmit={handleSubmit} >
        <TextField fullWidth
                id="name"
                name="name"
                label="Ingredient Category Name"
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

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <button 
              className='button add-button' 
              variant="contained" 
              type='submit'
              style={{marginTop:'10px' , }}>
                Create Category
              </button>
              </div>
        </form>
      </div>
    </div>
  )
}

