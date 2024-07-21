import React from 'react'
import {  Grid, Container } from '@mui/material';

import RecentTransactions from './RecentTransactions' 

function TransactionMain(props){

    return(
        <Container sx={{boxSizing: 'content-box'}}>
        <Grid container>
            <Grid item
                lg={12}
                sm={12}
                xl={12}
                xs={12}  
            >
                {/* {console.log(props)} */}
                <RecentTransactions orders = {props.orders}/>
            </Grid>
        </Grid>
        </Container>
    );
}

export default TransactionMain