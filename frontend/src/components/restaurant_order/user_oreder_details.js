import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Colours } from '../../assets/theme/theme';


import OrderwithS from './start_order';
;


export default function restaurantOrder(props) {

  const order = props.item
  const OID = props.orderId
  var image = order.image.data;

  return (
    <Container
      sx={{
        backgroundColor: Colours.dark,
        width: '100%',
        marginTop: '4%',
        marginBottom: '4%',
        borderRadius: "33px",

      }}>

      <Grid container spacing={3} sx={{ color: Colours.formWhite, paddingBottom: "2%" }} >

        <Grid item xs={12} sm={6}>
          <Typography fontFamily="Poppins" variant="h6" gutterBottom >
            Customer Details
          </Typography>
          <Box sx={{ backgroundColor: Colours.transparenceGrey, padding: "2%" }}>

            <Grid container spacing={3} sx={{ color: Colours.formWhite }} >
              <Grid item xs={12} sm={6}  >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 76,
                    height: 76,
                    margin: 'auto',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <p>OrderId:</p>
                <p>{OID}</p>
              </Grid>
            </Grid>
          </Box>

          {/* -------------------setting payment status-------------------- */}
          <hr />
          <OrderwithS order={order} oId={OID} />

          {/* -------------------------extra box----------------------------- */}
          {/* <Box sx={{ backgroundColor: Colours.transparenceGrey, padding: "2%", marginTop: "6%" }}>

            <Grid container spacing={3}
              sx={{

                marginLeft: "10%",
                [theme.breakpoints.down('sm')]: {
                  marginLeft: '40%',

                },
              }} >
              

              <Grid item xs={12} sm={6}>
                <ChatBubbleIcon sx={{ hover: Colours.white }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <MailIcon sx={{ hover: Colours.white }} />
              </Grid>

            </Grid>
          </Box> */}

        </Grid>


        {/* ----------------------------item details------------------------------ */}
        <Grid item xs={12} sm={6}>
          <Typography fontFamily="Poppins" variant="h6" gutterBottom >
            Order Details
          </Typography>
          <Box sx={{ backgroundColor: Colours.transparenceGrey, paddingLeft: "2%", paddingTop: "2%", paddingBottom: "2%" }}>

            <Grid container spacing={3} sx={{ color: Colours.formWhite }} >
              <Grid item xs={12} sm={6}  >
                <img src={`data:image/jpeg;base64,${image}`}
                  style={{
                    justify: "center",
                    width:"80%"
                  }} />
              </Grid>

              <Grid item xs={12} sm={6} >
                <p>{order.foodName}</p>
                <p>Price : Rs.{order.price}</p>
                <p>Quantity: {order.quantity}</p>
              </Grid>
            </Grid>
          </Box>

        </Grid>
        {/* -------------------------end of item details------------------------------ */}



        {/* <Grid item xs={12} sm={6}>
          <OrderwithS />
        </Grid> */}

        {/* <Grid item xs={12} sm={6}>
          <OrderwithD />
        </Grid> */}

      </Grid>
    </Container>
  );
}