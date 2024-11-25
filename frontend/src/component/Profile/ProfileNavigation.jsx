import React, { useState } from 'react';
import { Drawer, Divider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';
import ComplaintIcon from '@mui/icons-material/Error';

const menu = [
  { title: "Dashboard", icon: <DashboardIcon /> },
  { title: "Restaurant", icon: <RestaurantIcon /> },
  { title: "Orders", icon: <ShoppingBagIcon /> },
  { title: "Favorites", icon: <FavoriteIcon /> },
  { title: "Nutrigoals", icon: <AddReactionIcon /> },
  { title: "Payments", icon: <AccountBalanceWalletIcon /> },
  { title: "Offers", icon: <EventIcon /> },
  { title: "Complain", icon: <ComplaintIcon /> },
  { title: "Logout", icon: <LogoutIcon /> }
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={open}
      anchor="left"
      sx={{ zIndex: 1300, position: 'fixed' }}
    >
      <div style={{ 
        width: isSmallScreen ? '60vw' : '250px',
        height: '150vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        fontSize: '1.25rem', 
        gap: '0.9rem',
        marginTop: '5rem'
      }}>
        {menu.map((item, i) => (
          <React.Fragment key={i}>
            <div 
              onClick={() => handleNavigate(item)}
              onMouseEnter={() => setHoveredItem(i)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ 
                padding: '0.5rem 1.5rem',
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                cursor: 'pointer',
                transition: 'all 0.3s',
                backgroundColor: hoveredItem === i ? '#494646' : 'transparent', // Change color on hover
                boxShadow: hoveredItem === i ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none' // Add shadow on hover
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
}

export default ProfileNavigation;
