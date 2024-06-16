import { Avatar, Badge, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import "./Navbar.css"

export const Navbar=() => {
  return (
    <div className='px-5 z-50 py-[.8rem] bg-[#909e59] lg:px-20 flex justify-between'>

      
        <div className='lg:mr-10 cursor-pointer flex item-center space-x-4'>
          <li className='logo font-semibold text-gray-300 text-2xl'>
            FitEats
          </li>
        </div>
      

      <div className='flex item-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton>
            <SearchIcon sx={{fontSize:"1.5rem"}}/>
          </IconButton>
        </div>

        <div className='flex items-center flex items-center justify-center'>
          <Avatar sx={{bgcolor:"white",color:pink,fontSize:"1rem",width: 30, height: 30,}}>C</Avatar>
        </div>

        <div className=''>
          <IconButton>
            <Badge color="primary" badgeContent={3}>
            <ShoppingCartTwoToneIcon sx={{fontSize:"1.5rem"}}/>
            </Badge>
          </IconButton>
        </div>
      </div>

    </div>
  )
}

