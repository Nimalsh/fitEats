import { Dashboard, ShoppingBag } from '@mui/icons-material';
import React, { useState } from 'react';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import plateImage from './logo.png'; // Ensure this path is correct

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Incoming Orders", icon: <ShoppingBag />, path: "/incomingorders" },
  { title: "Meal Requests", icon: <ShopTwoIcon />, path: "/menu" },
  { title: "FoodCategory", icon: <CategoryIcon />, path: "/category" },
  { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
  { title: "Events", icon: <EventIcon />, path: "/events" },
  { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

export const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={true}
        anchor='left'
        sx={{ zIndex: 1 }}
      >
        <div style={{
          width: isSmallScreen ? '70vw' : '20vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontSize: '1.25rem',
          backgroundColor: 'black', // Background color changed to black
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <img src={plateImage} alt="Logo" style={{ width: '40%' }} />
          </div>
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => handleNavigate(item)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: '10px',
                  color: 'white',
                  borderRadius: '10px',
                  margin: '5px',
                  backgroundColor: hoverIndex === i ? '#696969' : 'black', // Hover color changed to dark grey
                  transition: 'background-color 0.3s',
                }}
                className={`sidebar-item ${i === menu.length - 1 ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};


