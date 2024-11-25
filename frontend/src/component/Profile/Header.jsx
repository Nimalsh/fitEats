import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Tabs, Tab, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate(); // Import the useNavigate hook

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    onTabChange(newValue);
  };

  const handleSuggestMenuClick = () => {
    navigate('/my-profile/custormize-order'); // Navigate to MenuSuggest
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          <Tab label="All" />
          <Tab label="Pizzas" />
          <Tab label="Sides" />
          <Tab label="Drinks" />
          <Tab label="Combos" />
          <Tab label="Appetizers" />
          <Tab label="Main Courses" />
          <Tab label="Desserts" />
          <Tab label="Salads" />
          <Tab label="Sandwiches" />
          <Tab label="Soups" />
          <Tab label="Seafood" />
          <Tab label="Vegetarian" />
          <Tab label="Vegan" />
          <Tab label="Grill" />
          <Tab label="Baked Goods" />
          <Tab label="Pasta" />
          <Tab label="Snacks" />
          <Tab label="Breakfast" />
          <Tab label="Lunch" />
          <Tab label="Dinner" />
        </Tabs>
        <Box sx={{ marginLeft: 'auto' }}>
         
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
