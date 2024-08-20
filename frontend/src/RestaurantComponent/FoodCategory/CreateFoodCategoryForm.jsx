import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategoryAction } from '../../component/State/Restaurant/Action'

export const CreateFoodCategoryForm = () => {

  const [ formData , setFormData ] = useState({categoryName:'', restaurantId:''})
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name : formData.categoryName,
      restaurantId: {
        id:602
      },
    };
    dispatch(createCategoryAction({reqData:data , jwt:localStorage.getItem("jwt")}))
    console.log(data)
    handleClose();  // Added this line to close the form
  }

  const handleInputChange = (e) => {
    const {name,value} = e.target
    setFormData({
      ...formData,[name]:value
    })
  }

  const handleClose = () => {
    setIsOpen(false)  // Set isOpen to false to close the form
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
        <h1 className='text-center text-xl pb-10'>Create New Category</h1>

        <form className='space-y-5' onSubmit={handleSubmit} >
          <TextField fullWidth
            id="categoryName"
            name="categoryName"
            label="Food Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
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
              style={{marginTop:'10px' , }}
            >
              Create Food Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
