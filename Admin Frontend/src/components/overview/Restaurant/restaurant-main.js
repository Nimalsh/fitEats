import React from 'react'
import {  Grid, Container } from '@mui/material';

import DashboardCard from '../DashboardCard'
import RestaurantTable from './restaurantTable'
import RestaurantTableBlocked from './restaurantTableBlocked'


import Typography from '@mui/material/Typography';
import StoreIcon from '@mui/icons-material/Store';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

function SystemMain(props){

    const restaurants = props.restaurants;

    const blocked = [];
    const active = [];

    Object.keys(restaurants).map(key=> {
        if (restaurants[key].status == 'blocked'){
            blocked.push(restaurants[key]);
        }
        else{
            active.push(restaurants[key]);
        }
    })

    // console.log(blocked)
    // console.log(active)

    return(
        <Container maxWidth="false">
        <Grid container spacing={3} width="1200px">
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Restaurant Count" value="654" icon={StoreIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Restaurant Income" value="45483" icon={PriceCheckIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Order Count" value="200" icon={ShoppingBasketIcon} type="down" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Complain Count" value="100" icon={LocalPoliceIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
        </Grid>
        <Grid
        container
        spacing={1}
        >
            <Grid item
                lg={12}
                md={12}
                xl={12}
                xs={12}
            >
                <RestaurantTable data={active}/>
            </Grid>
            <Grid item
                lg={12}
                md={12}
                xl={12}
                xs={12}
            >
                <Typography variant='h4' sx={{fontFamily: 'Poppins', fontWeight: '200', color: 'white'}}>Blocked Restaurants</Typography>
                <RestaurantTableBlocked data={blocked}/>
            </Grid>
        </Grid>
        </Container>
    );
}

export default SystemMain