import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Box, ThemeProvider, Typography } from '@mui/material';
import theme, { Colours } from '../../assets/theme/theme';
import CardMedia from '@mui/material/CardMedia';
import Freeimage from '../../assets/images/up1.jpg';
import Premiumimage from '../../assets/images/up2.jpg';


const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      'Monthly Subscription free',
      'Charge 6% from the orders',
      '.',
      '.',
      '.'
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'contained',
    buttonColor:'success',
    url: 'signupuser',
    image: Freeimage,

  },
  {
    title: 'Premium',
    // subheader: 'Most popular',
    price: '500',
    description: [
      'Monthly Subscription  Rs. 500',
      'No percentage from the orders',
      'Displaying nutrients values by image uploading',
      'Displaying intake chart'
    ],
    buttonText: 'Subscribe Now',
    buttonVariant: 'contained',
    buttonColor:'success',
    url: 'signuppremiumuser',
    image: Premiumimage,
  },
  // {
  //   title: 'Enterprise',
  //   price: '30',
  //   description: [
  //     '50 users included',
  //     '30 GB of storage',
  //     'Help center access',
  //     'Phone & email support',
  //   ],
  //   buttonText: 'Contact us',
  //   buttonVariant: 'outlined',
  // },
];

function PricingContent() {
  return (
    
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 5, pb: 4 }}>
        <Typography color="#95CD41" fontWeight="400" variant="h2" fontSize="300%"
          align="center"
        >
          Choose one package
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          {/* Choose user role */}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={6}
            >
              <Card style={{ borderRadius: '15px'}}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: Colours.darkgray2
                  }}
                />
                <CardMedia
                  component="img"
                  height="140"
                  image= {tier.image}
                />
                <CardContent  sx={{ backgroundColor:Colours.darkgray }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" style={{color:Colours.grayWhite}}>
                      Rs.{tier.price}
                    </Typography>
                    <Typography variant="h6" style={{color:Colours.grayWhite}}>
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                        style={{color:Colours.grayWhite}}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions sx={{ backgroundColor:Colours.darkgray }}>
                  <Button fullWidth variant={tier.buttonVariant} color={tier.buttonColor} onClick={() => {
    window.location.href = `${tier.url}`}}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </ThemeProvider>
     
    </React.Fragment>
  );
}

export default function RegisterBanner1() {
  return <PricingContent />;
}