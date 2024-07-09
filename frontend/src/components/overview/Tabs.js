import React from 'react';
import {ThemeProvider, Typography, Tab, Tabs} from '@mui/material';
import Drawer from '@mui/material/Drawer';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

import theme from '../../assets/theme/theme'; //to use theme provider,need to import this

const drawerWidth = 240;

function TabBar(props){
    
    const [value, setValue] = React.useState('one');
    // const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const drawer = (
        <Tabs
                value={value}
                onChange={handleChange}
                textColor= "primary"
                indicatorColor="secondary"
                orientation="vertical"
                sx = {{
                    position:"relative",
                    width:"70%"
                }}
            >
                <Tab value="one" label={<Typography fontSize="18px" fontWeight="300" color="primary">System</Typography>}/>
                <Tab value="two" label={<Typography fontSize="18px" fontWeight="300" color="primary">Users</Typography>}/>
                <Tab value="three" label={<Typography fontSize="18px" fontWeight="300" color="primary">Restaurants</Typography>}/>
                <Tab value="four" label={<Typography fontSize="18px" fontWeight="300" color="primary">Orders</Typography>}/>
                <Tab value="five" label={<Typography fontSize="18px" fontWeight="300" color="primary">Complains</Typography>}/>
            </Tabs>
    
    );
    
    // const container = window !== undefined ? () => window().document.body : undefined;
    
  return (
    <ThemeProvider theme={theme}>

        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <ArrowForwardIosIcon />
        </IconButton>

        {/* Drawer for mobile ----------------------------------------*/}
        <Drawer
        //   container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
                alignItems: "flex-end",
                boxSizing: 'border-box', 
                width: drawerWidth,
                position: "relative",
                backgroundColor: "transparent",
                 
             },            
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer for big screen devices------------------------------------ */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
                alignItems: "flex-end",
                boxSizing: 'border-box', 
                width: drawerWidth, 
                position: "relative",
                backgroundColor: "transparent",               
            },
          }}
          open
        >
          {drawer}
        </Drawer>

    </ThemeProvider>
  );
}

export default TabBar;