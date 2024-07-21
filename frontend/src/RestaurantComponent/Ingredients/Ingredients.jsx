import { Grid } from '@mui/material'
import React from 'react'
import { IngredientTable } from './IngredientTable'
import { IngredientCategoryTable } from './IngredientCategoryTable'

export const Ingredients = () => {
  return (
    <div className='px-2'> 
          <IngredientCategoryTable/>
    </div>
  )
}
