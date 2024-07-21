import React, { useEffect } from 'react'
import { Box, ThemeProvider, Typography, Tab, Tabs } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

import Menubar from '../components/Navbar';
import Overview from '../components/overview/Overview.js';
import SystemMain from '../components/overview/System/System-main';
import UsersMain from '../components/overview/Users/Users-main';
import RestaurantMain from '../components/overview/Restaurant/restaurant-main';
import Complains from '../components/overview/Complain/Complains-main';
import Transactions from '../components/overview/Transactions/TransactionsMain';

import TabPanel from '../components/TabPanel';


import theme from '../assets/theme/theme';
import '../assets/css/Dashboard-admin.css';

import axios from 'axios';

import authHeader from '../services/auth-header';



const Dashboard = () => {

    useEffect(() => {
        document.title = "Dashboard";
    }) 

    /* ------------------------------------------------------------Data Intialization */

    const [users, setUsers] = React.useState({});
    const [orders, setOrders] = React.useState({});
    const [restaurants, setRestaurants] = React.useState({});
    useEffect((event) => {

        /* -----------------------------------------Users */
        axios.get("http://localhost:8072/FoodiFy/Admin/Users/All",{ headers: authHeader()})
        .then(data => {
            const users = data.data;
            setUsers({ ...users});
        })
        .catch(error => {
            if (error.response.data) {
                console.log(error.response.data);
            }
        });

        /* -----------------------------------------Orders */
        axios.get("http://localhost:8072/FoodiFy/Admin/Orders/All",{ headers: authHeader()})
        .then(data => {
            const orders = data.data;
            setOrders({ ...orders});
            // console.log(orders);
        })
        .catch(error => {
            if (error.response.data) {
                console.log(error.response.data);
            }
        });

        /*-----------------------------------------Restaurants */
        axios.get("http://localhost:8072/FoodiFy/Admin/Restaurants/All",{ headers: authHeader()})
        .then(data => {
            const restaurants = data.data;
            setRestaurants({ ...restaurants});
            // console.log(restaurants);
        })
        .catch(error => {
            if (error.response.data) {
                console.log(error.response.data);
            }
        });
    
    }, []);


    /* ------------------------------------------------------------Drawer functions */
    const drawerWidth = 240;
    const [value, setValue] = React.useState(0);
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
                <Tab value={0} label={<Typography fontSize="18px" fontWeight="300" color="primary">System</Typography>}/>
                <Tab value={1} label={<Typography fontSize="18px" fontWeight="300" color="primary">Users</Typography>}/>
                <Tab value={2} label={<Typography fontSize="18px" fontWeight="300" color="primary">Restaurants</Typography>}/>
                <Tab value={3} label={<Typography fontSize="18px" fontWeight="300" color="primary">Transactions</Typography>}/>
                <Tab value={4} label={<Typography fontSize="18px" fontWeight="300" color="primary">Complaints</Typography>}/>
            </Tabs>
    
    );
    

    return (
        
        <Box backgroundColor= "#323131">
            <Menubar />
            <Overview />
            <Box sx={{
                display: 'flex',

            }}>
                <ThemeProvider theme={theme}>
                
                 {/* ------------------------------------------------------------Drawer Icon for mobile devices */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* ------------------------------------------------------------Drawer for mobile devices */}
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

                {/* ------------------------------------------------------------Big Screen tabset*/}
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

                <TabPanel value={value} index={0}>
                    <SystemMain orders={orders}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UsersMain users={users}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RestaurantMain restaurants={restaurants}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Transactions orders={orders}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <Complains />
                </TabPanel>
                    
            </Box>
            
        </Box>
        
    )
}

export default Dashboard
