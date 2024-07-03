import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Tabs, Tab, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    onTabChange(newValue);
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
          <Button variant="contained"  style={{ whiteSpace: 'nowrap' }}>
  Customize menus
</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
