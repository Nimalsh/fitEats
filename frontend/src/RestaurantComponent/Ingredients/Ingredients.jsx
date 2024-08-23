import { Grid } from '@mui/material'
import React from 'react'
import { IngredientTable } from './IngredientTable'
import { Tables } from './Tables'
import { IngredientCategoryTable } from './IngredientCategoryTable'
import { Category } from './Category'

export const Ingredients = () => {
  return (
    // <div className='px-2'> 
    //       {/* <IngredientCategoryTable/> */}
    // </div>

    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Tables/>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Category/>
      </Grid>
    </Grid>
  )
}
