import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const RestaurantCard = () => {
  return (
    <Card className=' w-[18rem]'>
      <div className={`${true?'cursor-pointer':'cursor-not-allowed'}relative`}>
      <img className='w-full h-[10rem] rounded-t-md object-cover' src="https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg" alt=''/>
      <Chip 
      size='small' 
      className='absolute top-2 left-2'
      color={true?"success":"error"}
      label={true?"open":"closed"}/>
      </div>

      <div className='p-4 textPart lg:flex w-full justify-between'>
        <div className='space-y-1'>
          <p className='font-semibold text-lg'>Indian Fast food </p>
          <p className='text-gray-500 text-sm'>
            Craving it all? Dive into our goal fla...
          </p>
        </div>

        <div>
          <IconButton>
              {true?<FavoriteIcon/>:<FavoriteBorderOutlinedIcon/>}
          </IconButton>
        </div>

      </div>
    </Card>
  )
}

export default RestaurantCard