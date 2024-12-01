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
    <Box sx={{ flexGrow: 1 }}>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <ShoppingCartTwoToneIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit">
        <SearchIcon />
      </IconButton>
      <IconButton color="inherit" onClick={handleAvatarClick}>
        <Avatar sx={{ bgcolor: pink[500] }}>
          <Person />
        </Avatar>
      </IconButton>
    </Box>
  );
};