import { Divider, Grid } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const RestaurantDetails = () => {
  return (
    <div className='px-5 lg:px-20'> 
        <section>
          <h3 className='text-gray-500 py-2 mt-10 '>Home/sri lanka/sri lankan food/3</h3>
          <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img className='w-full h-[40vh] object-cover' 
                  src='https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg' 
                  alt=''
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <img className='w-full h-[40vh] object-cover' 
                  src='https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_1280.jpg' 
                  alt=''
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <img className='w-full h-[40vh] object-cover' 
                  src='https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg' 
                  alt=''
                  />
                </Grid>

            </Grid>
          </div>

          <div className='pt-3 pb-5'>
            <h1 className='text-4xl font-semibold'>Sri Lankan Food</h1>

            <p className='text-gray-500 mt-1'>
              Discover Savory Bistro in downtown, where Mediterranean cuisine and a welcoming ambiance create the perfect dining experience.
            </p>
            <div className='space-y-3 mt-3'>
              <p className='text-gray-500 flex items-center gap-3'>
                <LocationOnIcon/>
                <span>
                  Matara,Sri lanka
                </span>
              </p>

              <p className='text-gray-500 flex items-center gap-3'>
                <CalendarTodayIcon/>
                <span>
                Mon-Sun: 9:00 AM - 9:00 PM (Today)
                </span>
              </p>
              
            </div>
          </div>
        </section>

        <section>
          <Divider/>
        </section>

        <section className='pt-[2rem] lg:flex relative'>
          <div className='space-y-10 lg:w-[20%] filter'>
            <div className='box space-y-5 lg:sticky top-28 '>

            </div>
          </div>

          <div className='space-y-10 lg:w-[20%] filter'>
            menu
          </div>

        </section>
    </div>
  )
}

export default RestaurantDetails