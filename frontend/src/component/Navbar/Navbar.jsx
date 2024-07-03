import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import "./Navbar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Navbar=() => {
  const navigate=useNavigate()
  return (
    <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#777525] lg:px-20 flex justify-between'>

      
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
          {false?<Avatar sx={{bgcolor:"white",color:pink,fontSize:"1rem",width: 30, height: 30,}}>C</Avatar>:
          <IconButton onClick={()=>navigate("/account/login")}>
            <Person/>
          </IconButton>}
        </div>

        <div className=''>
          <IconButton>
            <Badge color="primary" badgeContent={3}>
            <ShoppingCartTwoToneIcon sx={{fontSize:"1.5rem"}}/>
            </Badge>
          </IconButton>
        </div>
      </div>

    </Box>
  )
}

