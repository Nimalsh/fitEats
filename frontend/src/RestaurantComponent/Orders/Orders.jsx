import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { OrderTable } from './OrderTable';

const orderStatus=[
  {label:"Pending", value:"PANDING"},
  {label:"Completed", value:"COMPLETED"},
  {label:"All", value:"ALL"}
]

export const Orders = () => {
  const [filterValue,setFilterValue]=useState();

  const handleFilter=(e,value) => {
    setFilterValue(value);
  };

  return (
    <div 
    style={{
      backgroundImage: "url('assets/images/Background_image.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%'
    }}
  >
    <div className='px-2 mt-60px'>
        <Card className='p-5'>
            <Typography sx={{paddinBottom:"1rem"}} variant='h5'>
              Order Status

            </Typography>
            <FormControl>
              <RadioGroup onChange={handleFilter} row 
              name='category' 
              value={filterValue || "all"}>

                {orderStatus.map((item)=> <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio/>}
                label={item.label}
                sx={{color:"gray"}}
                 />)}

              </RadioGroup>
            </FormControl>

        </Card>
        <OrderTable/>
    </div>
  </div>

  )
}
