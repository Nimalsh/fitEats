import { Person } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Avatar, Badge, Box, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import logo from '../../../assets/images/logo_remove_blackground.png'

export const Navbar = () => {
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  return (
    <Box className='navbar'>
      <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
      <img src={logo} alt="FitEats Logo" className='h-11' /> {/* Add the image */}
        <li onClick={() => navigate("/")} className='logo font-semibold text-gray-300 text-2xl'>
          FitEats
        </li>
      </div>
      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </div>
        <div className='flex items-center justify-center'>
          {auth.user ? (
            <Avatar onClick={handleAvatarClick} sx={{ bgcolor: 'white', color: pink[500], fontSize: '1rem', width: 30, height: 30 }}>
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person />
            </IconButton>
          )}
        </div>
        {/* <div>
          <IconButton>
            <Badge color="primary" badgeContent={3}>
              <ShoppingCartTwoToneIcon sx={{ fontSize: '1.5rem' }} />
            </Badge>
          </IconButton>
        </div> */}
      </div>
    </Box>
  );
};
