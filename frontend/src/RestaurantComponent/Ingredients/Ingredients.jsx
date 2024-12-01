import React from 'react'
import { CombinedIngredientTable } from './CombinedIngredientTable'

export const Ingredients = () => {
  return (
    <div className='px-2'> 
          <CombinedIngredientTable />
    </div>

    // <Grid container spacing={2}>
    //   <Grid item xs={12} lg={8}>
    //     <Tables/>
    //   </Grid>
    //   <Grid item xs={12} lg={4}>
    //     <Category/>
    //   </Grid>
    // </Grid>
  )
}
