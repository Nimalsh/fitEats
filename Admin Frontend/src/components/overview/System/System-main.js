import React from 'react'
import {  Grid, Container } from '@mui/material';

import DashboardCard from '../DashboardCard'
import Chart from './charts.js'
import Orders from './FrequenltyOrderedFoods'

import AttachMoneyRounded from '@mui/icons-material/AttachMoneyRounded';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ReceiptIcon from '@mui/icons-material/Receipt';


function SystemMain(props){
    // console.log(props.orders)
    return(
        <Container padding="0" sx={{boxSizing: 'content-box'}}>
        <Grid container spacing={2}>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                
            >
                <DashboardCard title="Total Income Today" value="Rs.24129" icon={AttachMoneyRounded} type="up" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Income by Orders" value="Rs.14129" icon={ReceiptIcon} type="down" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Order Count" value="12" icon={FastfoodIcon} type="down" percentage="2%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Premiums" value="Rs.10000" icon={GroupAddIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
        </Grid>
        <Grid
        container
        spacing={3}
        >
            <Grid item
                lg={8}
                md={12}
                xl={9}
                xs={12}
            >
                <Chart orders={props.orders}/>
            </Grid>
            <Grid item
                lg={4}
                md={7}
                xl={3}
                xs={12}
            >
                <Orders />
            </Grid> 
        </Grid>
        </Container>
    );
}

export default SystemMain