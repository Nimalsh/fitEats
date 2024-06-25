import { IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function CartItem() {
  return (
    <div className='px-5'>
      <div className='lg:flex items-center lg:space-x-5'>

        <div>
          <img className='w-[5rem] h-[5rem] object-cover' 
          src='https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
        </div>

        <div  className='flex items-center justify-between lg:w-[70%]'>
          <div className='space-y-1 lg:space-y-3 w-full'>
            <p>Biriyani</p>
            <div className='flex justify-between items-center'>

                <div className='flex items-center space-x-1'>
                    <IconButton>
                      <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <div className='w-5 h-5 text-xs flex items-center justify-center'>{5}</div>
                    <IconButton>
                      <AddCircleOutlineIcon/>
                    </IconButton>
                </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
