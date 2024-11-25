import React from 'react'
import {Grid, Container} from '@mui/material';

import DashboardCard from '../DashboardCard'
import UserTable from './UserTable'
import Blocked from './BlockedTable'

import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

function SystemMain(props){

    const users = props.users;

    const blocked = [];
    const normal = [];

    Object.keys(users).map(key=> {
        if (users[key].blocked){
            blocked.push(users[key]);
        }
        else{
            normal.push(users[key]);
        }
    })

    return(
        <Container maxWidth="false" >
        <Grid container spacing={3} width="1200px">
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                
            >
                <DashboardCard title="User Count" value="65483" icon={GroupIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Regular Users" value="45483" icon={PersonIcon} type="down" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="Premium Users" value="20000" icon={AccessibilityNewIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
            <Grid item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DashboardCard title="New Signups" value="100" icon={GroupAddIcon} type="up" percentage="12%" since="yesterday"/>
            </Grid>
        </Grid>
        <Grid
        container
        spacing={3}
        >
            <Grid item
                lg={12}
                md={12}
                xl={12}
                xs={12}
            >
                <UserTable users = {normal} />
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
                <Typography variant="h4" sx={{color: 'white', fontFamily: 'Poppins', fontWeight: '200', marginTop: '0px'}}>Blocked Users</Typography>
                <Blocked users = {blocked}/>
            </Grid>
        </Grid>
        </Container>
    );
}

export default SystemMain