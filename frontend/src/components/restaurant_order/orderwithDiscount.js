import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import theme, { Colours } from '../../assets/theme/theme';
import Discountpng from '../../assets/images/discount_group.png';
import Button from '@mui/material/Button';


export default function OrderwithD() {

return (
<Box sx={{backgroundColor:Colours.transparenceGrey,padding:"2%"}}>
              
<Grid container spacing={3} sx={{color:Colours.formWhite}} >

   
    <Grid item xs={12} sm={6} sx={{marginTop:'15%'}}  >
        <img src={Discountpng}/>
                      
    </Grid>


    <Grid item xs={12} sm={6}>
    <p >Rs</p>
            <Box display="flex" justifyContent="space-between">
            <p>Sub Total :</p>
            <p>800.00</p>
            </Box>
            <Box display="flex" justifyContent="space-between">
            <p>Discount :</p>
            <p>2.5%</p>
            </Box>
            <Box display="flex" justifyContent="space-between">
            <p>Reducing Amount :</p>
            <p>100.00</p>
            </Box>
            <Box display="flex" justifyContent="space-between">
            <p>Total Amount :</p>
            <p>700.00</p>
            </Box>
    </Grid>

    <Grid item xs={12} sm={6} marginBottom={'2%'}>
        <Button xs={12} sm={6} href='#' variant="contained" sx={{
             marginLeft:'60%',
              background: Colours.green, '&:hover': {
                backgroundColor: Colours.yellow,
              },
              color: Colours.dark,
              fontSize: '20px',
              fontFamily:'Poppins',
              hover: Colours.yellow,
              [theme.breakpoints.down('sm')]: {
                fontSize: '18px',
                marginLeft:'0%',
                width:'100%',

               
              },
            }}>
              ACCEPT
            </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Button xs={12} sm={6} href='#' variant="contained" sx={{
              
              background: Colours.darkgray, '&:hover': {
                backgroundColor: Colours.grayWhite, color: Colours.dark,marginLeft:'1%'
              },
              color: Colours.grayWhite,
              fontSize: '20px',
              fontFamily:'Poppins',
              [theme.breakpoints.down('sm')]: {
                fontSize: '18px',
                width:'100%',
                marginBottom:'7%',
                
              },
            }}>
                REJECT
            </Button>
          
        </Grid>
       
</Grid>
</Box>
    )
}